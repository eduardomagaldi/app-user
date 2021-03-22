const express = require('express');
const fs = require('fs');
const path = require('path');
const db = require('./database');
const https = require('https');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const app = express();
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

app.use(helmet());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(
    cors({
        origin: 'http://localhost:3000',
        credentials: true,
        exposedHeaders: 'Location',
        optionsSuccessStatus: 200,
    }),
);
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.set("Content-Security-Policy", "default-src *; style-src 'self' http://* 'unsafe-inline'; script-src 'self' http://* 'unsafe-inline' 'unsafe-eval'")
    next();
});

let authorizationUrl = '/auth';

app.use(express.static('build'));

// create new user
app.post('/api/v1/user', async function (req, res) {
    const tokenSet = true;
    if (tokenSet) {
        const now = new Date().getTime();
        const dayInMillisec = 24 * 60 * 60 * 1000;
        const expire = new Date(now + dayInMillisec);
        const options = 'Secure; Path=/; HttpOnly';

        if (tokenSet.id_token) {
            res.header('Set-Cookie', 'id_token=' + tokenSet.id_token + '; Expires=' + expire + '; ' + options);
        }

        res.json(true);
    } else {
        res.redirect(401, authorizationUrl);
    }
});

// login, create new session
app.post('/api/v1/session', async function (req, res) {
    const tokenSet = true;
    if (tokenSet) {
        const now = new Date().getTime();
        const dayInMillisec = 24 * 60 * 60 * 1000;
        const expire = new Date(now + dayInMillisec);
        const options = 'Secure; Path=/; HttpOnly';

        if (tokenSet.id_token) {
            res.header('Set-Cookie', 'id_token=' + tokenSet.id_token + '; Expires=' + expire + '; ' + options);
        }

        res.json(true);
    } else {
        res.redirect(401, authorizationUrl);
    }
});

// logout
app.delete('/api/v1/session', auth, async function (req, res) {

});

https.createServer(options, app).listen(1313);

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
