// Function to handle the "Connect" button click
document.getElementById('connectButton').addEventListener('click', async () => {
    // Check if the Phantom Wallet extension is installed
    if (window.solana && window.solana.isPhantom) {
        try {
            // Request connection to Phantom Wallet
            await window.solana.connect();

            // Get the connected wallet's public key
            const publicKey = window.solana.publicKey.toString();

            // Replace the "Connect" button with the wallet address and image
            document.getElementById('connectButton').style.display = 'none';
            document.getElementById('walletInfo').style.display = 'flex'; // Show wallet info container

            // Create an image element for the wallet image
            const walletImage = document.createElement('img');
            walletImage.src = 'phantom1.jpg'; // Set the image source
            walletImage.alt = 'Phantom Wallet Logo'; // Add alt text for accessibility
            walletImage.className = 'wallet-image'; // Apply CSS class

            // Create a button element for the wallet address
            const walletAddressButton = document.createElement('button');
            walletAddressButton.className = 'wallet-button';
            walletAddressButton.id = 'walletAddressButton';
            walletAddressButton.textContent = publicKey;

            // Append the image and button to the wallet info container
            const walletInfoContainer = document.getElementById('walletInfo');
            walletInfoContainer.appendChild(walletImage);
            walletInfoContainer.appendChild(walletAddressButton);

            alert('Connected to Phantom Wallet!');
        } catch (error) {
            console.error('Error connecting to Phantom Wallet:', error);
            alert('Failed to connect to Phantom Wallet. Please make sure Phantom is installed and unlocked.');
        }
    } else {
        alert('Phantom Wallet extension is not installed. Please install and unlock Phantom Wallet to continue.');
    }
});