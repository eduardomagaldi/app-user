const express = require('express');
const fs = require('fs');
const path = require('path');
const db = require('./database');
const https = require('https');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const app = express();
// const { Issuer, generators, custom } = require('openid-client');
const cors = require('cors');
const cookieParser = require('cookie-parser');
// const NodeRSA = require('node-rsa');
// const Crypto = require('crypto');
// const report = require('./report');
// const nodemailer = require('nodemailer');
// const aws = require('aws-sdk');
// const CronJob = require('cron').CronJob;
// const log = require('./log');

// custom.setHttpOptionsDefaults({
// 	timeout: 100 * 1000,
// });

let options = {
    key: fs.readFileSync(path.join(__dirname, '../certificates', 'RootCA.key')),
    cert: fs.readFileSync(path.join(__dirname, '../certificates', 'RootCA.pem')),
};

// if (process.env.URL) {
// 	options = {
// 		key: fs.readFileSync(path.join('/etc/letsencrypt/live/portal.llac.adv.br', 'privkey.pem')),
// 		cert: fs.readFileSync(path.join('/etc/letsencrypt/live/portal.llac.adv.br', 'fullchain.pem')),
// 	};
// }

// process.env.URL = process.env.URL || 'localhost:8081';

app.use(helmet());
app.use(bodyParser.json());

if (!process.env.PRODUCTION) {
    app.use(
        cors({
            origin: 'https://' + process.env.URL,
            credentials: true,
            exposedHeaders: 'Location',
            optionsSuccessStatus: 200,
        }),
    );
}

app.use(cookieParser());

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', 'https://' + process.env.URL);
    next();
});

// let client;
// let code_verifier;
let authorizationUrl = '/auth';

// let googleIssuer;

// (async function () {
//     googleIssuer = await Issuer.discover('https://accounts.google.com');

//     process.env.GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || '659062205417-8knkjqi725qqnchfl6knhn05uv5ms4dp.apps.googleusercontent.com';
//     process.env.GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || '-oJ-hUYjZwL299vkfqHwU9MO';

//     client = new googleIssuer.Client({
//         client_id: process.env.GOOGLE_CLIENT_ID,
//         client_secret: process.env.GOOGLE_CLIENT_SECRET,
//         redirect_uris: ['https://' + process.env.URL + '/login'],
//         response_types: ['code'],
//         access_type: 'offline',
//     });

//     code_verifier =
//         new Date().toISOString().split('T')[0] +
//         'XMeoRpeQvLPLCzjovwbr4ccqKBKV8Tq80ZXLpP8zFkOM96zWo8oCy1IUSFq8mV7blG0JG3aEeWlSpfi2m5s7Zwma7fLnqUIiqGJZ';

//     const code_challenge = generators.codeChallenge(code_verifier);

//     authorizationUrl = client.authorizationUrl({
//         scope: 'openid email profile',
//         code_challenge,
//         code_challenge_method: 'S256',
//         prompt: 'consent',
//     });
// })();

app.use(express.static('dist'));

app.get('/api/login', async function (req, res) {
    const params = client.callbackParams(req);

    console.time('client.callback');
    const tokenSet = await client.callback(
        'https://' + process.env.URL + '/login',
        params,
        { code_verifier },
    )
    console.timeEnd('client.callback');

    if (tokenSet) {
        const now = new Date().getTime();
        const dayInMillisec = 24 * 60 * 60 * 1000;
        const expire = new Date(now + dayInMillisec);
        const options = 'Secure; Path=/; HttpOnly';

        if (tokenSet.id_token) {
            res.header('Set-Cookie', 'id_token=' + tokenSet.id_token + '; Expires=' + expire + '; ' + options);
        }

        if (tokenSet.refresh_token) {
            res.header('Set-Cookie', 'refresh_token=' + tokenSet.refresh_token + '; Expires=' + expire + '; ' + options);

            // client.refresh(tokenSet.refresh_token) // => Promise
            // 	.then(function (tokenSet) {
            // 	}).catch(console.error);
        }

        res.json(true);
    } else {
        res.redirect(401, authorizationUrl);
    }
});

app.get('/api', async function (req, res) {
    res.json(process.env.URL);
});

app.post('/api/logout', auth, async function (req, res) {
    const options = {
        protocol: 'https:',
        host: 'accounts.google.com',
        path: '/o/oauth2/revoke?token=' + req.cookies.id_token,
    };

    const googleReq = https.get(options, function (googleRes) {
        const bodyChunks = [];
        googleRes.on('data', function (chunk) {
            bodyChunks.push(chunk);
        }).on('end', function () {
            const body = Buffer.concat(bodyChunks);

            res.redirect(200, authorizationUrl);
        })
    });

    googleReq.on('error', function (e) {
        res.redirect(401, authorizationUrl);
    });
});

// //////////
// all
// //////////
app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, '../dist', 'index.html'));
});

https.createServer(options, app).listen(8080);

async function auth(req, res, next) {
    if (!req.cookies.id_token) {
        res.redirect(401, authorizationUrl);
        return;
    }

    const valid = await isTokenValid(req.cookies.id_token);

    if (!valid) {
        res.redirect(401, authorizationUrl);
        return;
    }

    const claims = parseJwt(req.cookies.id_token);

    if (claims.iss !== 'https://accounts.google.com' && claims.iss !== 'accounts.google.com') {
        res.redirect(401, authorizationUrl);
        return;
    }

    if (claims.aud !== process.env.GOOGLE_CLIENT_ID) {
        res.redirect(401, authorizationUrl);
        return;
    }

    if (new Date() > new Date(claims.exp * 1000)) {
        res.redirect(401, authorizationUrl);
        return;
    }

    if (claims.hd !== 'llac.adv.br') {
        res.redirect(401, authorizationUrl);
        return;
    }

    registerUser(claims);
    next();
}

function decodeAndJsonParse(base64) {
    const json = Buffer.from(base64, 'base64').toString('ascii');
    return JSON.parse(json);
}

async function isTokenValid(jwt) {
    const [rawHead, rawBody, signature] = jwt.split('.');

    const parsedHead = decodeAndJsonParse(rawHead);

    if (parsedHead.alg !== 'RS256') {
        return false;
    }

    console.time('PUB_KEY');
    const keystore = await googleIssuer.keystore(false);
    console.timeEnd('PUB_KEY');

    const allKeys = keystore.all();

    const jwk = allKeys.find((key) => key.kid === parsedHead.kid);

    if (!jwk) {
        return false;
    }

    if (jwk.alg !== 'RS256') {
        return false;
    }

    const key = new NodeRSA();
    key.importKey(
        {
            n: Buffer.from(jwk.n, 'base64'),
            e: Buffer.from(jwk.e, 'base64'),
        },
        'components-public',
    );

    const pem = key.exportKey('pkcs8-public-pem');

    const verifyObject = Crypto.createVerify('RSA-SHA256');
    verifyObject.write(rawHead + '.' + rawBody);
    verifyObject.end();

    const decodedSignature = Buffer.from(signature, 'base64').toString('base64');
    const signatureIsValid = verifyObject.verify(pem, decodedSignature, 'base64');

    return signatureIsValid;
}

function parseJwt(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(Buffer.from(base64, 'base64').toString().split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

async function saveSubjectList(trial, trialId) {
    if (trial.subjectList && trial.subjectList.length) {
        if (trial.id) {
            await db.query(
                'DELETE FROM "subjectsRelation" WHERE trial = $1',
                [trial.id],
            );
        }

        const subjectList = trial.subjectList;

        const result = subjectList.map((subject, i) => {
            return {
                trial: trialId,
                subject: subject.id,
                loosingChance: trial.subjectData[i].loosingChance,
            }
        });

        await db.insert('subjectsRelation', ['trial', 'subject', 'loosingChance'], result);
    } else {
        if (trial.subjectData && trial.subjectData.length) {
            await db.update(
                'subjectsRelation',
                ['id', 'loosingChance'],
                trial.subjectData,
            );
        }
    }
}

async function postList(list, table) {
    const newItems = [];
    const changedItems = [];
    const promises = [];

    list.forEach((item) => {
        if (item.id.toString().indexOf('temp_') > -1) {
            newItems.push(item);
        } else {
            changedItems.push(item);
        }
    });

    if (newItems.length) {
        promises.push(db.insert(table, ['name'], newItems));
    }

    if (changedItems.length) {
        promises.push(db.update(table, ['id', 'name'], changedItems));
    }

    await Promise.all(promises);
}

async function registerUser(claims) {
    const userId = claims.sub;
    const userList = await db.users.select(userId);
    const result = [{
        id: userId,
        name: claims.name,
        email: claims.email,
        imageUrl: claims.picture,
    }];

    if (userList && userList.length) {
        await db.update(
            'users',
            ['id', 'name', 'email', 'imageUrl'],
            result,
        );
    } else {
        await db.insert(
            'users',
            ['id', 'name', 'email', 'imageUrl'],
            result,
        );
    }
}

function getMonthString(date) {
    const d = new Date(date);
    const mo = d.getMonth();
    const monthStrings = [
        'Janeiro',
        'Fevereiro',
        'Março',
        'Abril',
        'Maio',
        'Junho',
        'Julho',
        'Agosto',
        'Setembro',
        'Outubro',
        'Novembro',
        'Dezembro',
    ];

    return monthStrings[mo];
}

async function sendReportMail(date, client, to) {
    const monthString = getMonthString(date);
    const monthNumber = ('0' + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();
    const pdfData = await report.generate(client.id, false);
    let subject = `Relatório - Locatelli - ${monthString}/${year}`;

    if (!process.env.PRODUCTION) {
        to = ['magaldi1989@gmail.com'];
        subject = `[dev ${date.getTime()}]` + subject.toUpperCase();
    }

    sendMail(
        'Caroline Martins <caroline.martins@llac.adv.br>',
        to,
        subject,
        getMessage(monthString),
        [
            {
                filename: `${monthNumber}.${year}-${urlize(client.name)}.pdf`,
                content: pdfData,
                contentType: 'application/pdf',
            },
        ],
    );
}

function sendMail(from, to, subject, html, attachments) {
    const bcc = [
        'magaldi1989@gmail.com',
    ];

    if (process.env.PRODUCTION) {
        bcc.push('maicon.galafassi@llac.adv.br');
        bcc.push(from);
    }

    transporter.sendMail({
        from,
        to,
        bcc,
        subject,
        html,
        attachments,
    },
        (err, info) => {
            console.info('err', err);
            console.info(info);
        });
}

function urlize(orig) {
    let result = orig.replace(/ /g, '_');
    result = result.toLowerCase();
    return result;
}

async function sendReport() {
    console.log('sendReport');

    const now = new Date();
    const today = now.getDate();

    const clients = await db.clients.selectForReportSending(today);

    if (process.env.SES_ID && process.env.SES_KEY) {
        const to = ['magaldi1989@gmail.com'];
        const message = [
            `Relatórios enviados hoje (${clients.length}):`,
        ];

        clients.forEach((client) => {
            const reportEmailList = client.reportEmailList || ['ninguém'];
            message.push(client.name + ` (enviado para: ${reportEmailList.join(', ')})`);
        });

        if (process.env.PRODUCTION) {
            to.push('maicon.galafassi@llac.adv.br');
        }

        sendMail(
            'magaldi1989@gmail.com',
            to,
            `[Portal Locatelli] Rotina de envio de relatórios ${now}`,
            message.join('<br />'),
        );
    }

    if (clients.length) {
        if (process.env.SES_ID && process.env.SES_KEY) {
            clients.forEach(async (client) => {
                if (client.reportType === 'pdf' && client.reportEmailList.length) {
                    sendReportMail(now, client, client.reportEmailList);
                }
            });
        }
    }
}
