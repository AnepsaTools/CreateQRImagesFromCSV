const QRCode = require('qrcode')
const fs = require('fs');

// Cargar las URL del CSV y generar los QRs
const opts = {
    errorCorrectionLevel: 'H',
    type: 'image/png',
    quality: 0.95,
    margin: 1,
    color: {
     dark: '#fff',
     light: '#ccc',
    },
   }
   

   const qrCodeText = 'https://activofijosaaf.com';
   const filepath = "./image" + ".png"
   const file = fs.createWriteStream(filepath);
   const code =  QRCode.toFileStream(file, qrCodeText);