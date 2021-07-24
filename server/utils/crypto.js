const crypto = require('crypto-js')

const md5 = (str) => {
    return crypto.MD5(str).toString(crypto.enc.Hex)
}

/**
 * @param {String} value 
 * @return {String} 
 */
const sha1 = (value) => {
    return crypto.SHA1(value).toString(crypto.enc.Hex)
}

const encrypt = (str) => {
    const m = crypto.MD5(str)
    const s = m.toString(crypto.enc.Hex)
    const s1 = s.slice(0, s.length / 2)
    const s2 = s.slice(s.length / 2, s.length)
    const encrypted = crypto.AES.encrypt(str, s)
    return s1 + encrypted.toString() + s2
}

const decrypt = (str) => {
    const s1 = str.slice(0, 16)
    const s2 = str.slice(str.length - 16, str.length)
    const key = str.slice(16, str.length - 16)
    return crypto.AES.decrypt(key, s1 + s2).toString(crypto.enc.Utf8)
}

const getDerivedKey = (str) => {
    return crypto.PBKDF2(str, 'salt', 1, 32, 'sha512').toString(crypto.enc.Hex)
}

module.exports = {
    md5,
    sha1,
    encrypt,
    decrypt,
    getDerivedKey
}