// Import necessary modules from the Solana SDK
const { Connection, PublicKey, SystemProgram, Transaction, sendAndConfirmTransaction } = require('@solana/web3.js');

// Assuming the "Send SOL" button has the id "sendSolButton"
const sendSolButton = document.getElementById('sendSolButton');

// Function to check if Phantom wallet is installed and toggle the "Send SOL" button
async function checkPhantomWallet() {
    try {
        // Check if the Phantom wallet is installed and connected
        if (!window.solana || !window.solana.isPhantom) {
            throw new Error('Phantom wallet is not installed or not detected.');
        }

        // Request wallet connection
        await window.solana.connect();

        // If connected to a wallet, show the "Send SOL" button
        const sendSolButton = document.getElementById('sendSolButton');
        sendSolButton.style.display = 'block';
    } catch (error) {
        console.error('Error connecting to wallet:', error);
    }
}

// Add an event listener to the button
sendSolButton.addEventListener('click', () => {
    // Function to send SOL with Phantom
    async function sendSolWithPhantom(recipientAddress, amount) {
        try {
            // Check and request wallet connection
            await connectToPhantomWallet();

            // Initialize a connection to the Solana network
            const connection = new Connection('https://api.mainnet-beta.solana.com');

            // Get the user's public key (wallet address)
            const publicKey = await window.solana.publicKey();

            // Create a transaction
            const transaction = new Transaction().add(
                SystemProgram.transfer({
                    fromPubkey: publicKey,
                    toPubkey: new PublicKey(recipientAddress),
                    lamports: amount * 1000000000, // Amount in SOL (in lamports)
                })
            );

            // Sign and send the transaction
            const signature = await sendAndConfirmTransaction(
                connection,
                transaction,
                [window.solana.publicKey]
            );

            // Transaction sent successfully
            console.log(`Transaction sent. Signature: ${signature}`);
        } catch (error) {
            console.error('Error sending SOL:', error);
        }
    }

    // Export the checkPhantomWallet and sendSolWithPhantom functions for use in other parts of your code if needed
    module.exports = { checkPhantomWallet, sendSolWithPhantom };
    sendSolWithPhantom('RecipientPublicKey', 1); // Replace with actual values
});
