import {default as bcryptjs} from "bcryptjs";
import {generateKeyPairSync, publicEncrypt, privateDecrypt} from "node:crypto";

export function hash(str, salt = 16) {
    return bcryptjs.hashSync(str, salt);
}

export function compareHash(str, hash) {
    return bcryptjs.compareSync(str, hash);
}

export function generateRSAKeyPair() {
    return generateKeyPairSync("rsa", {
        modulusLength: 2048,
        publicKeyEncoding: {
            type: 'pkcs1',
            format: 'pem'
        },
        privateKeyEncoding: {
            type: 'pkcs1',
            format: 'pem',
            cipher: 'aes-256-cbc',
            passphrase: ''
        }
    });
}

export function RSAEncrypt(data, key = "") {
    if (key !== "") {
        return publicEncrypt(key, Buffer.from(data)).toString("base64");
    }
    let {privateKey, publicKey} = generateRSAKeyPair();
    return {privateKey, publicKey, data: RSAEncrypt(data, publicKey)};
}

export function RSADecrypt(data, key) {
    // let a = Buffer.from(data, "base64");
    // let b = crypto.privateDecrypt({key: key.toString(), passphrase: ''}, a);
    // return b.toString("utf-8");
    return privateDecrypt({key: key.toString(), passphrase: ''}, Buffer.from(data, "base64")).toString("utf-8");
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

export class RSAList {
    array = []

    constructor(array = []) {
        this.array = array;
    }

    add() {
        let delay = 7200000;
        if (arguments.length === 0) {
            this.array.push(new RSA());
            // return this.array[this.array.length - 1];
        }
        if (arguments.length === 1) {
            this.array.push(new RSA());
        }
        else if (arguments.length === 2) {
            this.array.push(arguments[0]);
            delay = arguments[1];
        }
        else {return;}
        let elem = this.array[this.array.length - 1];
        if (delay > 0) {
            setTimeout(() => {
                let flag = false;
                this.array.forEach((value, index) => {
                    if (flag) { return; }
                    if (value === elem) {
                        this.array.splice(index, 1);
                        flag = true;
                    }
                });
            }, delay);
        }
        return elem;
    }

    decrypt(data, remove = false) {
        for (let i = 0; i < this.array.length; i++) {
            try {
                let ans = this.array[i].decrypt(data);
                if (remove) {
                    this.array.splice(i, 1);
                }
                return ans;
            }
            catch (e) {}
        }
        return undefined;
    }
}