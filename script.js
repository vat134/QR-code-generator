// Pagaidiet, līdz HTML saturs ir pilnībā ielādēts
document.addEventListener('DOMContentLoaded', () => {
    // Iegūstiet atsauces uz DOM elementiem
    const textInput = document.getElementById('text-input');
    const generateBtn = document.getElementById('generate-btn');
    const downloadBtn = document.getElementById('download-btn');
    const qrcodeDiv = document.getElementById('qrcode');

    // Pievienojiet notikumu listeners pogu
    generateBtn.addEventListener('click', generateQRCode);
    downloadBtn.addEventListener('click', downloadQRCode);

    // Funkcija, lai ģenerētu QR kodu
    function generateQRCode() {
        // Iegūstiet un noņemiet ievades teksta tukšumus
        const text = textInput.value.trim();
        // Pārbaudiet, vai ievade ir tukša
        if (!text) {
            alert('Ievadiet tekstu vai URL');
            return;
        }

        // Notīriet iepriekšējo QR kodu
        qrcodeDiv.innerHTML = '';
        // Izveidojiet jaunu QR kodu ar norādītajām opcijām
        new QRCode(qrcodeDiv, {
            text: text,                    // Teksts, kas jākodē
            width: 200,                    // QR koda platums
            height: 200,                   // QR koda augstums
            colorDark: '#000000',          // Tumšās kvadrātu krāsa (melna)
            colorLight: 'rgba(0, 0, 0, 0)', // Tikai tukšās kvadrātu krāsa (transparenta)
            correctLevel: QRCode.CorrectLevel.H // Kļūdas korekcijas līmenis (Augsts)
        });

        // Iespējot lejupielādes pogu pēc QR koda ģenerēšanas
        downloadBtn.disabled = false;
    }

    // Funkcija, lai lejupielādētu QR kodu kā PNG
    function downloadQRCode() {
        // Iegūstiet canvas elementu, kurā ir QR kods
        const canvas = qrcodeDiv.querySelector('canvas');
        if (!canvas) return;

        // Izveidojiet lejupielādes saiti
        const link = document.createElement('a');
        link.download = 'qr-code.png';     // Iestatiet faila nosaukumu
        link.href = canvas.toDataURL('image/png'); // Pārvērst canvas par PNG
        link.click();                      // Aktivēt lejupielādi
    }
});