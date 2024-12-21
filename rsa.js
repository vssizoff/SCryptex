import NodeRSA from "./node-rsa/src/NodeRSA.js";

export class RSA {
    crypt = new NodeRSA();

    constructor({publicKey = "", privateKey = ""} = {}) {
        if (publicKey === "" && privateKey === "") {
            this.generateKeyPair();
        }
        else {
            this.publicKey = publicKey ?? undefined;
            this.privateKey = privateKey ?? undefined;
        }
    }

    generateKeyPair() {
        this.crypt.generateKeyPair();
    }

    exportPublicKey(format = "pkcs8", pem = true) {
        return this.crypt.exportKey(`${format}-public-${pem ? "pem" : "der"}`);
    }

    exportPrivateKey(format = "pkcs8", pem = true) {
        return this.crypt.exportKey(`${format}-private-${pem ? "pem" : "der"}`);
    }

    get publicKey() {
        return this.exportPublicKey();
    }

    set publicKey(key) {
        if (key) this.crypt.importKey(key);
    }

    get privateKey() {
        return this.exportPrivateKey();
    }

    set privateKey(key) {
        if (key) this.crypt.importKey(key);
    }

    publicEncrypt(data, {sourceEncoding = undefined, outputEncoding = "base64"} = {}) {
        return this.crypt.encrypt(data, outputEncoding, sourceEncoding);
    }

    privateDecrypt(data) {
        return this.crypt.decrypt(data, "buffer");
    }

    privateDecryptUtf8(data) {
        return this.privateDecrypt(data).toString("utf8");
    }

    privateDecryptAuto(data, encoding = "utf8") {
        let decoded = this.privateDecrypt(data).toString(encoding);
        try {
            return JSON.parse(decoded);
        } catch (error) {
            return isNaN(Number(decoded)) ? decoded : Number(decoded);
        }
    }

    encrypt(data) {
        return this.publicEncrypt(data);
    }

    decrypt(data) {
        return this.privateDecrypt(data);
    }

    privateEncrypt(data, {sourceEncoding = undefined, outputEncoding = "base64"} = {}) {
        return this.crypt.encryptPrivate(data, outputEncoding, sourceEncoding);
    }

    publicDecrypt(data) {
        return this.crypt.decryptPublic(data, "buffer");
    }

    publicDecryptUtf8(data) {
        return this.publicDecrypt(data).toString("utf8");
    }

    publicDecryptAuto(data, encoding = "utf8") {
        let decoded = this.publicDecrypt(data).toString(encoding);
        try {
            return JSON.parse(decoded);
        } catch (error) {
            return isNaN(Number(decoded)) ? decoded : Number(decoded);
        }
    }

    sign(data, {sourceEncoding = undefined, outputEncoding = "base64"} = {}) {
        return this.crypt.sign(data, outputEncoding, sourceEncoding);
    }

    verify(data, signature, {sourceEncoding = undefined, signatureEncoding = "base64"} = {}) {
        return this.crypt.verify(data, signature, sourceEncoding, signatureEncoding);
    }
}

export function generateRSAKeyPair(format = "pkcs8", pem = false) {
    let crypt = new RSA();
    return {
        privateKey: crypt.exportPrivateKey(format, pem),
        publicKey: crypt.exportPublicKey(format, pem)
    };
}

export function RSAEncrypt(data, key = "", {sourceEncoding = undefined, outputEncoding = "base64"} = {}) {
    let crypt = new RSA({publicKey: key});
    if (key === "") return {data: crypt.encrypt(data), publicKey: crypt.publicKey, privateKey: crypt.privateKey};
    return crypt.publicEncrypt(data, {sourceEncoding, outputEncoding});
}

export function RSADecrypt(data, key) {
    return new RSA({privateKey: key}).decrypt(data);
}

export function RSADecryptUtf8(data, key) {
    return new RSA({privateKey: key}).privateDecryptUtf8(data);
}

export function RSADecryptAuto(data, key, encoding = "utf8") {
    return new RSA({privateKey: key}).privateDecryptAuto(data, encoding);
}

export function RSAEncryptPrivate(data, key = "", {sourceEncoding = undefined, outputEncoding = "base64"} = {}) {
    let crypt = new RSA({publicKey: key});
    if (key === "") return {data: crypt.encrypt(data), publicKey: crypt.publicKey, privateKey: crypt.privateKey};
    return crypt.privateEncrypt(data, {sourceEncoding, outputEncoding});
}

export function RSADecryptPublic(data, key) {
    return new RSA({privateKey: key}).decrypt(data);
}

export function RSADecryptPublicUtf8(data, key) {
    return new RSA({privateKey: key}).publicDecryptUtf8(data);
}

export function RSADecryptPublicAuto(data, key, encoding = "utf8") {
    return new RSA({privateKey: key}).publicDecryptAuto(data, encoding);
}

export function RSASign(data, key, {sourceEncoding = undefined, outputEncoding = "base64"} = {}) {
    return new RSA({privateKey: key}).sign(data, {sourceEncoding, outputEncoding});
}

export function RSAVerify(data, key, signature, {sourceEncoding = undefined, signatureEncoding = undefined}) {
    return new RSA({publicKey: key}).verify(data, signature, {sourceEncoding, signatureEncoding});
}