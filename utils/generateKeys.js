// generate public and private keys and save them

const crypto = require('crypto');
const fs = require('fs');

function generateKeys() {
    const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
        modulusLength: 2048,
        publicKeyEncoding: {
            type: 'spki',
            format: 'pem',
        },
        privateKeyEncoding: {
            type: 'pkcs8',
            format: 'pem',
        },
    });

    fs.writeFileSync('public.pem', publicKey);
    fs.writeFileSync('private.pem', privateKey);

    console.log('Private and Public keys generated');
}

module.exports = generateKeys;
