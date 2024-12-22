import CryptoJS from "crypto-js";
// import {generate as generateString} from "randomstring";
import cryptoRandomString from "crypto-random-string";
import {Buffer} from "buffer";

export const AESModes = CryptoJS.mode;

export function generatePassphrase(length = 32) {
    // return generateString({
    //     length,
    //     charset: ["alphabetic", "numeric"]
    // });
    return cryptoRandomString({length, type: "ascii-printable"});
}

export function generateAESKey(passphrase = "", length = 256, salt = 128) {
    if (typeof salt === "number") salt = CryptoJS.lib.WordArray.random(salt/8)
    return CryptoJS.PBKDF2(passphrase, salt, { keySize: length/32 }).toString();
}

export function AESEncrypt(data, key = "", mode = AESModes.CBC, cfg = {}) {
    if (key !== "") {
        if (data instanceof Buffer) data = CryptoJS.lib.WordArray.create(data);
        // if (!(data instanceof CryptoJS.lib.WordArray) && typeof data === "object") data = JSON.stringify(data);
        return CryptoJS.AES.encrypt(data, key, {mode: mode, ...cfg}).toString();
    }
    let passphrase = generatePassphrase();
    key = generateAESKey(passphrase);
    return {
        encrypted: AESEncrypt(data, key, mode),
        key, passphrase
    }
}

export function AESDecrypt(data, key, mode = AESModes.CBC, cfg = {}) {
    return Buffer.from(CryptoJS.AES.decrypt(data, key, {mode: mode, ...cfg}).toString(CryptoJS.enc.Hex), "hex");
}

export function AESDecryptUtf8(data, key, mode = AESModes.CBC, cfg = {}) {
    return AESDecrypt(data, key, mode, cfg).toString("utf8");
}

export function AESDecryptAuto(data, key, mode = AESModes.CBC, cfg = {}, encoding = "utf8") {
    let decoded = AESDecrypt(data, key, mode, cfg).toString(encoding);
    try {
        return JSON.parse(decoded);
    } catch (error) {
        return isNaN(Number(decoded)) ? decoded : Number(decoded);
    }
}

export class AES {
    key;
    mode = AESModes.CBC;
    cfg = {};

    constructor(key = "", mode = AESModes.CBC) {
        if (key === "") this.key = generateAESKey();
        else this.key = key;
        this.mode = mode;
    }

    encrypt(data, cfg = {}) {
        return AESEncrypt(data, this.key, this.mode, {...this.cfg, cfg});
    }

    decrypt(data, cfg = {}) {
        return AESDecrypt(data, this.key, this.mode, {...this.cfg, cfg});
    }

    decryptUtf8(data, cfg = {}) {
        return AESDecryptUtf8(data, this.key, this.mode, {...this.cfg, cfg});
    }

    decryptAuto(data, cfg = {}, encoding = "utf8") {
        return AESDecryptAuto(data, this.key, this.mode, {...this.cfg, cfg}, encoding);
    }
}