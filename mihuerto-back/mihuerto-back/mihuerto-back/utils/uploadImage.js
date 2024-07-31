const fs = require('fs');
const path = require('path');

const saveBase64Image = (base64String, fileName) => {
  const matches = base64String.match(/^data:(.+);base64,(.+)$/);
  if (!matches || matches.length !== 3) {
    throw new Error('Invalid base64 string');
  }
  const ext = matches[1].split('/')[1];
  const buffer = Buffer.from(matches[2], 'base64');
  const filePath = path.join('uploads', `${fileName}.${ext}`);
  
  fs.writeFileSync(filePath, buffer);
  return filePath;
};

module.exports = {saveBase64Image};
