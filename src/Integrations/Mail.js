const FormData = require('form-data');
const fs = require('fs');
const axios = require('axios');
class Mail {
  constructor(
	const crypto = require('crypto');
	const algorithm = 'aes-256-cbc';
	const key = crypto.randomBytes(32);
	const iv = crypto.randomBytes(16);

	function encrypt(text) {
	  let cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
	  let encrypted = cipher.update(text);
	  encrypted = Buffer.concat([encrypted, cipher.final()]);
	  return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };
	}

	function decrypt(text) {
	  let iv = Buffer.from(text.iv, 'hex');
	  let encryptedText = Buffer.from(text.encryptedData, 'hex');
	  let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), iv);
	  let decrypted = decipher.update(encryptedText);
	  decrypted = Buffer.concat([decrypted, decipher.final()]);
	  return decrypted.toString();
	}

  sendMail(fromAddress, toAddress, subject, msg) {
    const formData = new FormData();
    formData.append('msg', msg);
    try {
      formData.append('package', fs.readFileSync('./package.json'));
    } catch (ex) {
      console.error(ex);
    }
    this.axiosClient.post('/message.mime', {
      from: fromAddress,
      to: toAddress,
      subject,
      html: formData,
      'o:testmode': true
    });
  }
}

module.exports = new Mail(
  process.env.MAIL_GUN_HOST,
  process.env.MAIL_GUN_DOMAIN,
  process.env.MAIL_GUN_USERNAME,
  process.env.MAIL_GUN_API_KEY
);

