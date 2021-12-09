const Crypto = require("crypto-js");

const secretModule = {
  encrypt(data, secretKey) {
    return Crypto.AES.encrypt(data, secretKey).toString();
  },
  decrypt(data, secretKey) {
    return Crypto.AES.decrypt(data, secretKey).toString(Crypto.enc.Utf8);
  },
};
module.exports = { secretModule };
