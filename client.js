const yargs = require('yargs');
const generateKeys = require('./utils/generateKeys');
const submitKey = require('./utils/submitKey');
const signMessage = require('./utils/signMessage');
const verifySignature = require('./utils/verifySignature');

const argv = yargs
    .command('generate', 'Generate a new keypair of private and public keys')
    .command('submit', 'Submit public key to endpoint', {
        serverUrl: {
            description: 'Endpoint URL',
            demandOption: true,
            type: 'string',
        },
        password: {
            description: 'Password for authentication',
            demandOption: true,
            type: 'string',
        },
    })
    .command('sign', 'Sign message using private key', {
        message: {
            description: 'Message to sign',
            demandOption: true,
            type: 'string',
        },
    })
    .command('verify', 'Verify message signature', {
        serverUrl: {
            description: 'Endpoint URL',
            demandOption: true,
            type: 'string',
        },
        message: {
            description: 'Message to verify',
            demandOption: true,
            type: 'string',
        },
        signature: {
            description: 'Signature to verify',
            demandOption: true,
            type: 'string',
        },
    })
    .help()
    .alias('help', 'h').argv;


// call functions based on cli params 
if (argv._.includes('generate')) {
    generateKeys();
} else if (argv._.includes('submit')) {
    submitKey(argv.serverUrl, argv.password);
} else if (argv._.includes('sign')) {
    signMessage(argv.message);
} else if (argv._.includes('verify')) {
    verifySignature(argv.serverUrl, argv.message, argv.signature);
}
