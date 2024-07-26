const axios = require('axios');

async function verifySignature(serverUrl, message, signature) {
    try {
        const response = await axios.post(`${serverUrl}/verifySignature`, {
            message,
            signature,
        });
        console.log('Verified?', response.data);
    } catch (error) {
        if (error.response) {
            console.error('Error:', error.response.data);
        } else {
            console.error('Error:', error.message);
        }
    }
}

module.exports = verifySignature;
