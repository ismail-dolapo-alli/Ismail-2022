
const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const yargs = require('yargs');

const argv = yargs
	.option('password', {
		alias: 'p',
		description: 'Password for client authentication',
		type: 'string',
		demandOption: false,
	})
	.option('port', {
		alias: 'P',
		description: 'Port for the server to listen on',
		type: 'number',
		default: 3000,
	})
	.help()
	.alias('help', 'h').argv;

const app = express();
const port = argv.port;
let passwordHash = argv.password ? bcrypt.hashSync(argv.password, 10) : null;
let publicKey = null;

app.use(bodyParser.json());

// Route for handling public key submission
app.post('/submitPublicKey', (req, res) => {
	if (passwordHash) {
		// If a password is set, check authorization header
		const auth = req.headers['authorization'];
		if (!auth || !auth.startsWith('Bearer ')) {
			return res.status(401).send('Unauthorized');
		}
		const providedPassword = auth.split(' ')[1];
		if (!bcrypt.compareSync(providedPassword, passwordHash)) {
			return res.status(401).send('Unauthorized');
		}
	} else {
		// No password provided, return an error
		return res.status(401).send('Password is required to submit public key');
	}
	publicKey = req.body.publicKey;
	res.send('Public key stored');
});

// Route for handling verification request
app.post('/verifySignature', (req, res) => {
	if (!publicKey) {
		return res.send({ valid: false });
	}
	const { message, signature } = req.body;
	const verify = crypto.createVerify('SHA256');
	verify.update(message);
	const isValid = verify.verify(publicKey, signature, 'hex');
	res.send({ valid: isValid });
});

app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});






// async function savePublicKey(userId, publicKey) {
//     const db = await connect();
//     const collection = db.collection('publicKeys');
//     await collection.updateOne(
//         { userId },
//         { $set: { publicKey } },
//         { upsert: true }
//     );
//     console.log('Public key saved.');
// }

// async function getPublicKey(userId) {
//     const db = await connect();
//     const collection = db.collection('publicKeys');
//     const result = await collection.findOne({ userId });
//     return result ? result.publicKey : null;
// }
 