import {JSEncrypt} from "./jsencrypt/index.js";

export function generateRSAKeyPair(length = 1024) {
    // let key = generateRSAKey(passphrase, length);
    let crypt = new JSEncrypt({default_key_size: length});
    return {
        privateKey: crypt.getPrivateKeyB64(),
        publicKey: crypt.getPublicKeyB64()
    };
}

export function RSAEncrypt(data, key = "") {
    if (key !== "") {
        let crypt = new JSEncrypt();
        crypt.setPublicKey(key);
        return crypt.encrypt(data);
    }
    let {privateKey, publicKey} = generateRSAKeyPair();
    return {privateKey, publicKey, data: RSAEncrypt(data, publicKey)};
}

export function RSADecrypt(data, key) {
    let crypt = new JSEncrypt();
    crypt.setPrivateKey(key);
    return crypt.decrypt(data);
}

export class RSA {
    publicKey = undefined
    privateKey = undefined

    constructor(publicKey = undefined, privateKey = undefined) {
        if (publicKey === undefined) {
            let {publicKey, privateKey} = generateRSAKeyPair();
            this.publicKey = publicKey;
            this.privateKey = privateKey;
        }
        else if (privateKey === undefined) {
            this.publicKey = publicKey
        }
        else {
            this.publicKey = publicKey;
            this.privateKey = privateKey;
        }
    }

    encrypt(data) {
        return RSAEncrypt(data, this.publicKey);
    }

    decrypt(data) {
        return RSADecrypt(data, this.privateKey);
    }
}

// let {privateKey, publicKey} = generateRSAKeyPair();
// console.log(privateKey);
// console.log(publicKey);
// let encrypted = RSAEncrypt("test", publicKey);
// console.log(encrypted);
// console.log(RSADecrypt(encrypted, privateKey));