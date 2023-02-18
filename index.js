const QRCode = require("qrcode");
const fs = require("fs");
const csv = require("csv-parser");
const args = process.argv;

const opts = {
  errorCorrectionLevel: "H",
  type: "image/png",
  quality: 0.95,
  margin: 1,
  color: {
    dark: "#FFFFFF",
    light: "#000000",
  },
};

var files = fs.readdirSync('./');
console.log(files);

if(files.filter(file => file.includes('.csv'))){
  console.log('found');
  const foundFile = files.filter(file => file.includes('.csv'));
  console.log(foundFile);
  const fileName = foundFile.toString();

const results = [];
fs.createReadStream(fileName)
  .pipe(csv())
  .on("data", (data) => results.push(data))
  .on("end", () => {
    results.forEach((element) => {
      const qrCodeText = element.QR;
      const ID = element.ID2;
      const filepath = "./GeneratedCodes/" + fileName + "/" + ID + ".png";
      const file = fs.createWriteStream(filepath);
      const code = QRCode.toFileStream(file, qrCodeText, opts);
      code;
    });
    const folderName = fileName;
    const folderPath = "./GeneratedCodes/" + folderName + "/";
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath);
    } else {
      console.log("Folder already exists");
    }
  });

} else {
  console.log('not found');
}