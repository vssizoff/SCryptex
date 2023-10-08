import * as CryptoJS from "crypto-js";
import {generate as generateString} from "randomstring";

export function generatePassphrase(length = 32) {
    return generateString({
        length,
        charset: ["alphabetic", "numeric"]
    });
}

export function generateAESKey(passphrase = "", length = 256, salt = 128) {
    if (typeof salt === "number") salt = CryptoJS.lib.WordArray.random(salt/8)
    return CryptoJS.PBKDF2(passphrase, salt, { keySize: length/32 }).toString();
}

export function AESEncrypt(data, key = "") {
    if (key !== "") return CryptoJS.AES.encrypt(data, key).toString();
    let passphrase = generatePassphrase();
    key = generateAESKey(passphrase);
    return {
        encrypted: AESEncrypt(data, key),
        key, passphrase
    }
}

export function AESDecrypt(data, key) {
    return CryptoJS.AES.decrypt(data, key).toString(CryptoJS.enc.Utf8);
}

export class AES {
    key

    constructor(key = "") {
        if (key === "") this.key = generateAESKey();
        else this.key = key;
    }

    encrypt(data) {
        return AESEncrypt(data, this.key);
    }

    decrypt(data) {
        return AESDecrypt(data, this.key);
    }
}