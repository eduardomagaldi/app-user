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

let options = {
    key: fs.readFileSync(path.join(__dirname, '../certificates', 'RootCA.key')),
    cert: fs.readFileSync(path.join(__dirname, '../certificates', 'RootCA.pem')),
};

app.use(helmet());
app.use(bodyParser.json());
app.use(cookieParser());

const port = '1313';

app.use(
    cors({
        origin: `https://localhost:${port}`,
        credentials: true,
        exposedHeaders: 'Location',
        optionsSuccessStatus: 200,
    }),
);
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', `https://localhost:${port}`);
    res.set("Content-Security-Policy", "default-src *; style-src 'self' http://* 'unsafe-inline'; script-src 'self' http://* 'unsafe-inline' 'unsafe-eval'")
    next();
});

app.use(express.static('build'));

// create new user
app.post('/api/v1/user', async function (req, res) {
    // TODO some validation/sanitization for security resons
    const dataUser = { ...req.body };

    const result = await db.insert(
        'users',
        Object.keys(dataUser),
        [dataUser],
    );

    if (result) {
        if (result.error) {
            res.json(result.error);
        } else {
            login(dataUser, res);
        }
    } else {
        //TO DO validation/error handling
    }
});

// login, create new session
app.post('/api/v1/session', async function (req, res) {
    login(req.body, res);
});

// logout
app.delete('/api/v1/session', auth, async function (req, res) {
    //TO DO delete session from database
    res.json(true);
});

https.createServer(options, app).listen(1313);

async function auth(req, res, next) {
    if (!req.cookies.id_token) {
        res.sendStatus(401);
        return;
    }

    if (req.cookies.id_token === '$9gF5ZBptpNBaVBp0!EhvO9&5gg#DizG%#UEKoaqs3DqdpYRpZ') {
        next();
    }
}

async function login(data, res) {
    const result = await db.users.get(data.email, data.password);
    // TO DO make hash of password

    if (result) {
        const now = new Date().getTime();
        const dayInMillisec = 24 * 60 * 60 * 1000;
        const expire = new Date(now + dayInMillisec);
        const options = 'Secure; Path=/; HttpOnly';
        const token = '$9gF5ZBptpNBaVBp0!EhvO9&5gg#DizG%#UEKoaqs3DqdpYRpZ';
        // TODO generate a signed JWT

        // TO DO create session on the database const session = db.sessions.create(result);

        res.header('Set-Cookie', 'id_token=' + token + '; Expires=' + expire + '; ' + options);
        res.json(result);
    } else {
        res.sendStatus(401);
    }
}

// more of my code

// async function isTokenValid(jwt) {
//     const [rawHead, rawBody, signature] = jwt.split('.');

//     const parsedHead = decodeAndJsonParse(rawHead);

//     if (parsedHead.alg !== 'RS256') {
//         return false;
//     }

//     console.time('PUB_KEY');
//     const keystore = await googleIssuer.keystore(false);
//     console.timeEnd('PUB_KEY');

//     const allKeys = keystore.all();

//     const jwk = allKeys.find((key) => key.kid === parsedHead.kid);

//     if (!jwk) {
//         return false;
//     }

//     if (jwk.alg !== 'RS256') {
//         return false;
//     }

//     const key = new NodeRSA();
//     key.importKey(
//         {
//             n: Buffer.from(jwk.n, 'base64'),
//             e: Buffer.from(jwk.e, 'base64'),
//         },
//         'components-public',
//     );

//     const pem = key.exportKey('pkcs8-public-pem');

//     const verifyObject = Crypto.createVerify('RSA-SHA256');
//     verifyObject.write(rawHead + '.' + rawBody);
//     verifyObject.end();

//     const decodedSignature = Buffer.from(signature, 'base64').toString('base64');
//     const signatureIsValid = verifyObject.verify(pem, decodedSignature, 'base64');

//     return signatureIsValid;
// }

// function parseJwt(token) {
//     const base64Url = token.split('.')[1];
//     const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
//     const jsonPayload = decodeURIComponent(Buffer.from(base64, 'base64').toString().split('').map(function (c) {
//         return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
//     }).join(''));

//     return JSON.parse(jsonPayload);
// }
