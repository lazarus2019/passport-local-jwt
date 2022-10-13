const CryptoJS = require("crypto-js");

const encodePassword = (password) => {
  return CryptoJS.AES.encrypt(password, process.env.PASSWORD_SECRET_KEY);
};

const decodePassword = (password) => {
  return CryptoJS.AES.decrypt(
    password,
    process.env.PASSWORD_SECRET_KEY
  ).toString(CryptoJS.enc.Utf8);
};

module.exports = {
  encodePassword,
  decodePassword,
};
