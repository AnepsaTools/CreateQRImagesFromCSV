const QRCode = require('qrcode')
const fs = require('fs');
const csv = require("csv-parser");
const args = process.argv;
console.log(args);


const opts = {
    errorCorrectionLevel: 'H',
    type: 'image/png',
    quality: 0.95,
    margin: 1,
    color: {
     dark: '#ffffff',
     light: '#000000',
    },
   }


// ask for a file
// hacer que el folder name sea el FileName
// 




const results = [];
fs.createReadStream("data.csv")
  .pipe(csv())
  .on("data", (data) => results.push(data))
  .on("end", () => {

    results.forEach((element) => {
        const qrCodeText = element.QR;
        const ID = element.ID2;
        const filepath = "./GeneratedCodes/" + ID + ".png"
        // console.log(ID);
        const file = fs.createWriteStream(filepath);
        const code =  QRCode.toFileStream(file, qrCodeText, opts);
        code;
        
    });
  });
