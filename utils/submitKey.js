// retrives public keys and sends it to endpoint

const axios = require('axios');
const fs = require('fs');

async function submitKey(serverUrl, password) {
	try {
		const publicKey = fs.readFileSync('public.pem', 'utf8');
		const response = await axios.post(
			`${serverUrl}/submitPublicKey`,
			{ publicKey },
			{
				headers: { Authorization: `Bearer ${password}` },
			}
		);
		console.log('Public key submitted:', response.data);
	} catch (error) {
		if (!serverUrl) {
			console.error('Error:', 'Please provide a server url');
		}
		if (error.response) {
			console.error('Error:', error.response.data);
		} else {
			console.error('Error:', error.message);
		}
	}
}

module.exports = submitKey;
