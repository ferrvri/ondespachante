const crypto = require('crypto-js');

module.exports = class CryptoService {

    encodeData(data) {
        const encodedData = crypto.AES.encrypt(JSON.stringify(data), process.env.FRONTEND_KEY.toString()).toString();
        return encodedData;
    }

    decodeData(data) {
        const decodedData = crypto.AES.decrypt(data, process.env.FRONTEND_KEY.toString()).toString();
        return decodedData;
    }
}