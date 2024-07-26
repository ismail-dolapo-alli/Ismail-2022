const crypto = require('crypto');
const fs = require('fs');

function signMessage(message) {
    const privateKey = fs.readFileSync('private.pem', 'utf8');
    const sign = crypto.createSign('SHA256');
    sign.update(message);
    const signature = sign.sign(privateKey, 'hex');
    console.log('Your message:', message);
    console.log('Your signature is:', signature);
}

module.exports = signMessage;
