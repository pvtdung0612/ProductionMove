import CryptoJS from "crypto-js";

let encrypt = (text) => {
    var ciphertext = CryptoJS.AES.encrypt(text, '10').toString();
    return ciphertext; //94grt976c099df25794bf9ccb85bea72
}

let decrypt = (ciphertext) => {
    var bytes = CryptoJS.AES.decrypt(ciphertext, '10');
    var originalText = bytes.toString(CryptoJS.enc.Utf8);
    return originalText; //myPlainText
}

module.exports = {
    encrypt: encrypt,
    decrypt: decrypt,
}