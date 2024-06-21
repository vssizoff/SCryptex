import {RSA, RSAEncryptPrivate, RSADecrypt, AESEncrypt, AESDecrypt, AESModes} from "./index.js";
import * as fs from "node:fs";

function rsaKeyExportTest() {
    let rsa = new RSA;
    console.log(rsa.exportPrivateKey("pkcs8"));
    console.log();
    console.log(rsa.exportPublicKey("pkcs8", false).toString("base64"));
    console.log();
    console.log(rsa.exportPublicKey("openssh"));
    console.log();
    console.log(rsa.exportPrivateKey("openssh", false).toString("base64"));
    console.log();
    console.log(rsa.exportPublicKey("components"));
    console.log();
    console.log(rsa.exportPrivateKey("components"));
}

function rsaTest() {
    let rsa = new RSA;
    console.log(rsa.publicKey);
    console.log(rsa.exportPublicKey("pkcs8", false).toString("base64"));
    console.log(rsa.privateKey);
    let encrypted = rsa.encrypt({test: 0});
    console.log(encrypted);
    console.log(RSADecrypt(encrypted, rsa.privateKey));
    encrypted = RSAEncryptPrivate(fs.readFileSync("./rsa.js"), rsa.privateKey);
    console.log(encrypted);
    console.log(rsa.publicDecryptUtf8(encrypted));
    let data = fs.readFileSync("./index.d.ts");
    let signature = rsa.sign(data);
    console.log(signature);
    console.log(rsa.verify(data, signature), rsa.verify("test", signature));
}

function aesTest() {
    let {encrypted, key} = AESEncrypt("test");
    console.log(key);
    console.log(encrypted);
    console.log(AESDecrypt(encrypted, key).toString());
    encrypted = AESEncrypt("test", key, AESModes.CTR);
    console.log(encrypted);
    console.log(AESDecrypt(encrypted, key, AESModes.CTR).toString());
}

rsaKeyExportTest();
// rsaTest();
// aesTest();