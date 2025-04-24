// Wait for the DOM to be fully loaded before executing the code
document.addEventListener('DOMContentLoaded', () => {
    // Get references to DOM elements
    const textInput = document.getElementById('text-input');
    const generateBtn = document.getElementById('generate-btn');
    const downloadBtn = document.getElementById('download-btn');
    const qrcodeDiv = document.getElementById('qrcode');

    // Add event listeners to buttons
    generateBtn.addEventListener('click', generateQRCode);
    downloadBtn.addEventListener('click', downloadQRCode);

    // Function to generate QR code
    function generateQRCode() {
        // Get and trim the input text
        const text = textInput.value.trim();
        // Check if input is empty
        if (!text) {
            alert('Enter text or URL');
            return;
        }

        // Clear previous QR code
        qrcodeDiv.innerHTML = '';
        // Create new QR code with specified options
        new QRCode(qrcodeDiv, {
            text: text,                    // Text to encode
            width: 200,                    // Width of QR code
            height: 200,                   // Height of QR code
            colorDark: '#000000',          // Color of dark squares (black)
            colorLight: 'rgba(0, 0, 0, 0)', // Color of light squares (transparent)
            correctLevel: QRCode.CorrectLevel.H // Error correction level (High)
        });

        // Enable download button after QR code is generated
        downloadBtn.disabled = false;
    }

    // Function to download QR code as PNG
    function downloadQRCode() {
        // Get the canvas element containing the QR code
        const canvas = qrcodeDiv.querySelector('canvas');
        if (!canvas) return;

        // Create download link
        const link = document.createElement('a');
        link.download = 'qr-code.png';     // Set filename
        link.href = canvas.toDataURL('image/png'); // Convert canvas to PNG
        link.click();                      // Trigger download
    }
});