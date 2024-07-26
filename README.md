Task: 
1. Create a Client side application that can be called with different arguments from the cli that:
   a. Generates a asymmetic keypair and stores it for later use.
   b. Submit the public key of the generated keypair to the server via a password authenticated http request.
   c. Able to sign messages provided via cli arguments to the server and display the message and signature to the terminal.
   d. Sends message and signature combo to server to verify it's authenticity via http request

2. Create a Server side application that can:
   a. Accept requests via https methods
   b. Allow user to set password
   c. Allow client to send public key via http
   d. Allow anyone to submit a signed message to server for verification.

Running my submission:

1. Clone the repository
2. Run npm install to install dependencies

   Start the server application
The server can be ran in two modes to fulfill the requirements
1. To start the server in authenticated mode pass password flag in the cli when running the server application to authenticate client
   when it sends a request to the submitPublicKey route eg node server.js --password [yourSecurePassword],
   you can provide an optional custom port to the command or it will otherwise default to port 3000
   eg node server.js --port 4000 --password [yourSecurePassword].
3. To start server to test when user is not authenticated, run the application in terminal without the password flag
   eg node server.js (default port) or node server.js --port 4000 (custom port).

   Start the client application

1. Open a seperate terminal and run the command: node client.js generate.
   This will generate a Private and Public key pairs
2. To submit your public key to the server run node client.js submit --serverUrl http://localhost:3000 --password mySecretPassword in the CLI (http://localhost:3000
   or your custom port).
3. Run node client.js sign --message "YourMessage" to sign a message with your private key before sending it to the server, this will return your
   message with your signature key  <signatureKey>.
4. To verify your signature run node client.js verify --serverUrl http://localhost:3000 --message "YourMessage"  --signature <signatureKey>,
   (http://localhost:3000 or your custom port).

If User is not verified, they will not be able to sumbit their private key.
Due to time constraint ( I had to take my wife to the clinic) and I understand the time limit on the task is 6 hours, I was unable to set up a mongoDb 
otherwise I would have sent the Public key to the database with an identifier such as a userID when user submits their public key.
fetch the public key from the database when user tries to verify their signature. 

I left a sample code snippet in server.js file (lines 72 - 88)


