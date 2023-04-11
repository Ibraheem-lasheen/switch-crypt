




const crypto = require('crypto');

function AESencrypt(input, key) {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    let encrypted = cipher.update(input, 'utf8', 'hex');

  // let encrypted = cipher.update(input, 'utf8', 'base64','binary');
    encrypted += cipher.final('hex');

  // encrypted += cipher.final('base64');
  return iv.toString('hex') + ':' + encrypted;
}

function AESdecrypt(input, key) {
  console.log(input);
  const [ivString, encrypted] = input.split(':');
  const iv = Buffer.from(ivString, 'hex');
  const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');

  // let decrypted = decipher.update(encrypted, 'utf8', 'base64');
  decrypted += decipher.final('utf8');
  return decrypted;
}


// Example usage
const Aeskey = crypto.randomBytes(32); // 256-bit key



module.exports = {AESencrypt,AESdecrypt,Aeskey};