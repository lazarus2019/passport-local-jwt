const CryptoJS = require("crypto-js");
const bcrypt = require("bcryptjs");

const encodePassword = (password) => {
  return CryptoJS.AES.encrypt(password, process.env.PASSWORD_SECRET_KEY);
};

const decodePassword = (password) => {
  return CryptoJS.AES.decrypt(
    password,
    process.env.PASSWORD_SECRET_KEY
  ).toString(CryptoJS.enc.Utf8);
};

// BcryptJS

const BCryptEncode = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hashSync(password, salt);
};

const BCryptDecode = (enterPass, userPass) => {
  return bcrypt.compare(enterPass, userPass);
};

module.exports = {
  encodePassword,
  decodePassword,
};
