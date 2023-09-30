// Function to request the balance using the public key
async function requestBalance(publicKey) {
    try {
        // Initialize a connection to the Solana network (use the appropriate network URL)
        const connection = new Connection('https://api.devnet.solana.com');

        // Fetch the balance for the provided publicKey
        const balance = await connection.getBalance(new PublicKey(publicKey));

        // Display the balance in an element with id "balanceResult"
        document.getElementById('balanceResult').textContent = `Balance: ${balance / 10 ** 9} SOL`; // Convert lamports to SOL
    } catch (error) {
        console.error('Error requesting balance:', error);
        // Handle errors and provide user feedback here
        document.getElementById('balanceResult').textContent = `Error: ${error.message}`;
    }
}