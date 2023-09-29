// script.js

// Import necessary modules from the Solana SDK
const { Connection, PublicKey, SystemProgram, Transaction, sendAndConfirmTransaction } = require('@solana/web3.js');

// Function to send SOL with Phantom
async function sendSolWithPhantom(recipientAddress, amount) {
    try {
        // Check if the Phantom wallet is installed and connected
        if (!window.solana || !window.solana.isPhantom) {
            throw new Error('Phantom wallet is not installed or not detected.');
        }

        // Request wallet connection
        await window.solana.connect();

        // Initialize a connection to the Solana network (you can allow users to select the network)
        const connection = new Connection('https://api.devnet.solana.com');

        // Get the user's public key (wallet address)
        const publicKey = await window.solana.publicKey();

        // Check user's SOL balance (you can fetch the actual balance from the blockchain)
        const balance = 100; // Replace with actual balance check

        // Ensure the user has enough SOL to send
        if (balance < amount) {
            throw new Error('Insufficient SOL balance.');
        }

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
        // Handle errors and provide user feedback here
        document.getElementById('transferResult').innerText = `Error: ${error.message}`;
    }
}
