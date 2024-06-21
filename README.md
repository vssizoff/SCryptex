![SCryptex docs](./SCryptex.png)
<p align="center">Simple pure js cryptography</p>

# Table of Contents
> 1. [RSA class](#rsa)
> 2. [RSA functional method](#functional-method)
> 3. [AES class](#aes)
> 4. [AES functional method](#functional-method-1)
> 5. [Hash](#hash-bcrypt)
# RSA
## RSA class
```javascript
import {RSA} from "scryptex";

let rsa = new RSA; // Keys will be generated
let rsa = new RSA({publicKey: "your public key", privateKey: "your private key"}); // or with generated keys (see supported formats in [Duck Duck Go](#key_exporting_importing))
```
### Public encrypting
```javascript
let encrypted = rsa.encrypt("your data");
let encrypted = rsa.publicEncrypt("your data");
// or you can set encodings ("ascii" | "utf8" | "utf16le" | "ucs2" | "latin1" | "base64" | "hex" | "binary" | "buffer")
let encrypted = rsa.publicEncrypt("your data", {sourceEncoding: "ascii", outputEncoding: "buffer"});
```
### Private decrypting
```javascript
let decrypted = rsa.decrypt(encrypted); // decrypt to Buffer
let decrypted = rsa.privateDecrypt(encrypted); // also decrypt to Buffer
let decrypted = rsa.privateDecryptUtf8(encrypted); // decrypt to utf-8 string
let decrypted = rsa.privateDecryptAuto(encrypted); // decrypt to object, array, number or string if possible 
let decrypted = rsa.privateDecryptAuto(encrypted, "utf8"); // decrypt to object, array, number or string if possible
```
### Private encrypting
```javascript
let encrypted = rsa.privateEncrypt("your data");
// or you can set encodings ("ascii" | "utf8" | "utf16le" | "ucs2" | "latin1" | "base64" | "hex" | "binary" | "buffer")
let encrypted = rsa.privateEncrypt("your data", {sourceEncoding: "ascii", outputEncoding: "buffer"});
```
### Public decrypting
```javascript
let decrypted = rsa.publicDecrypt(encrypted); // decrypt to Buffer
let decrypted = rsa.publicDecryptUtf8(encrypted); // decrypt to utf-8 string
let decrypted = rsa.publicDecryptAuto(encrypted, "utf8"); // decrypt to object, array, number or string if possible
```
### Sign / verify
```javascript
let signature = rsa.sign("test");
// or you can set encodings
let signature = rsa.sign("test", {sourceEncoding: "ascii", outputEncoding: "buffer"});

rsa.verify("test", signature); // true
rsa.verify("abc", signature); // false
```
### Key exporting / importing
#### Import key
```javascript
rsa.publicKey = "your key";
rsa.privateKey = "your key";
```
#### Export key
Supported formats: "openssh", "pkcs1", "pkcs8", "components"

Second argument 
```javascript
console.log(rsa.exportPrivateKey("pkcs8"));
// -----BEGIN PRIVATE KEY-----
// MIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYw.......
// -----END PRIVATE KEY-----
console.log(rsa.exportPublicKey("pkcs8", false).toString("base64"));
// MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCA.....
console.log(rsa.exportPublicKey("openssh"));
// ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQC7a.....
console.log(rsa.exportPrivateKey("openssh", false).toString("base64"));
// b3BlbnNzaC1rZXktdjEAAAAABG5vbmUAAAAEbm9uZ.....
console.log(rsa.exportPublicKey("components"));
// {
//     n: <Buffer 00 ae cc 82 cf 9f d2 3c 9f a0 ea f3 ed 0c 21 a8 e7 42 95 ea f0 97 e0 32 30 33 88 1f 8e 29 14 ce 38 61 41 71 87 55 b4 28 69 b5 bb 64 b5 e4 bc e6 ac 81 ... 207 more bytes>,
//     e: 65537
// }
console.log(rsa.exportPrivateKey("components"));
// {
//     n: <Buffer 00 ae cc 82 cf 9f d2 3c 9f a0 ea f3 ed 0c 21 a8 e7 42 95 ea f0 97 e0 32 30 33 88 1f 8e 29 14 ce 38 61 41 71 87 55 b4 28 69 b5 bb 64 b5 e4 bc e6 ac 81 ... 207 more bytes>,
//     e: 65537,
//     d: <Buffer 00 ae 16 34 39 7f dc ac 4f f6 bd c9 0d ce c5 3f 28 83 22 38 08 41 da 21 61 ec 10 a8 0c b7 51 67 48 b3 63 b0 23 ae f1 6c 46 4b 9e 44 60 fb 5c 3f 08 93 ... 207 more bytes>,
//     p: <Buffer 00 dd c2 c3 7c 9f 10 c6 a9 df a8 94 7d 88 5e ca f4 cb 76 1a f0 50 2b 4a 1d 28 20 0d 49 44 b1 fd a6 41 1a 74 59 e3 61 13 b7 79 16 66 52 cc de 8d 81 ac ... 79 more bytes>,
//     q: <Buffer 00 c9 c9 8c 25 d6 bf 94 9e b4 e3 72 dc 02 95 96 0a b9 80 ec e1 50 10 c9 4b 39 02 b8 b6 66 d4 8a 12 3c cc 13 ee 6c b6 25 65 3e c0 ca 11 ad 39 71 6b de ... 79 more bytes>,
//     dmp1: <Buffer 4b 8d 67 7c b5 d4 c9 5a 66 d0 d0 86 54 47 b7 6d df 43 c5 b9 ca 16 75 91 a9 72 02 14 cc 4a b7 d8 44 a5 f6 ae 09 41 b1 ad f8 9b 21 11 64 ab 0e 1a f7 fe ... 78 more bytes>,
//     dmq1: <Buffer 39 98 6f 8a 35 5b 85 7e 2f 3f 64 7f 6b b5 6a 98 31 0e 9d 8e 4a 1e 20 76 7a 15 4e c7 b1 5e 24 f2 c3 ab b4 5c af 66 e6 11 99 f1 c9 3b 76 68 18 f9 a3 32 ... 78 more bytes>,
//     coeff: <Buffer 7c a2 48 62 69 db 84 bf a4 b1 a9 d3 5e a6 dd 39 99 0e 72 bf c6 ad 87 8a 5d 57 23 a2 62 c4 14 fa 03 8f 85 ff 37 d9 66 e5 1b 5e e1 1f 53 50 b0 e8 aa 13 ... 78 more bytes>
// }
```
## Functional method
### Generating key pair
```javascript
import {generateRSAKeyPair} from "scryptex";

let {privateKey, publicKey} = generateRSAKeyPair("pkcs8" /*format*/, true /*pem(true) or der(false)*/);
```
### Public encrypting
```javascript
let encrypted = RSAEncrypt("your data", publicKey);
// or you can set encodings ("ascii" | "utf8" | "utf16le" | "ucs2" | "latin1" | "base64" | "hex" | "binary" | "buffer")
let encrypted = RSAEncrypt("your data", publicKey, {sourceEncoding: "ascii", outputEncoding: "buffer"});
```
### Private decrypting
```javascript
let decrypted = RSADecrypt(encrypted, privateKey); // decrypt to Buffer
let decrypted = RSADecryptUtf8(encrypted, privateKey); // decrypt to utf-8 string
let decrypted = RSADecryptAuto(encrypted, privateKey); // decrypt to object, array, number or string if possible 
let decrypted = RSADecryptAuto(encrypted, privateKey, "utf8"); // decrypt to object, array, number or string if possible
```
### Private encrypting
```javascript
let encrypted = RSAEncryptPrivate("your data", privateKey);
// or you can set encodings ("ascii" | "utf8" | "utf16le" | "ucs2" | "latin1" | "base64" | "hex" | "binary" | "buffer")
let encrypted = RSAEncryptPrivate("your data", privateKey, {sourceEncoding: "ascii", outputEncoding: "buffer"});
```
### Public decrypting
```javascript
let decrypted = RSADecryptPublic(encrypted, publicKey); // decrypt to Buffer
let decrypted = RSADecryptPublicUtf8(encrypted, publicKey); // decrypt to utf-8 string
let decrypted = RSADecryptPublicAuto(encrypted, publicKey, "utf8"); // decrypt to object, array, number or string if possible
```
### Sign / verify
```javascript
let signature = RSASign("test", privateKey);
// or you can set encodings
let signature = RSAVerify("test", privateKey, {sourceEncoding: "ascii", outputEncoding: "buffer"});

rsa.verify("test", publicKey, signature); // true
rsa.verify("abc", publicKey, signature); // false
rsa.verify("Test", publicKey, signature); // false
```
### Generating keys and encrypting
```javascript
let {privateKey, publicKey, data: encrypted} = SCryptex.RSAEncrypt(data); // data will be encrypted
```
# AES
## AES class
```javascript
import {AES, AESModes} from "scryptex";

let aes = new AES; // Key will be generated
let aes = new AES("your key");
let aes = new AES("your key", AESModes.CFB /*default CBC*/); // set AES mode
```
about AES modes <https://www.highgo.ca/2019/08/08/the-difference-in-five-modes-in-the-aes-encryption-algorithm>
### Encrypting
```javascript
let encrypted = aes.encrypt("your data", {} /*cfg for crypto-js*/);
```
### Decrypting
```javascript
let decrypted = aes.decrypt(encrypted, {} /*cfg for crypto-js*/); // decrypt to Buffer
let decrypted = aes.decryptUtf8(encrypted); // decrypt to utf-8 string
let decrypted = aes.decryptAuto(encrypted); // decrypt to object, array, number or string if possible 
let decrypted = aes.decryptAuto(encrypted, {}, "utf8"); // decrypt to object, array, number or string if possible
```
### Import / export key
```javascript
aes.key = "your key";
console.log(aes.key);
```
## Functional method
### Generating key
```javascript
let passphrase = generatePassphrase(length1 /*optional*/);
let key = generateAESKey(passphrase, length2 /*optional*/, saltLength /*optional*/);
```
### Encrypting
```javascript
let encrypted = AESEncrypt("your data", key, AESModes.CFB /*default CBC, optional*/, {} /*cfg for crypto-js*/);
```
### Decrypting
```javascript
let decrypted = AESDecrypt(encrypted, key, {} /*cfg for crypto-js*/); // decrypt to Buffer
let decrypted = AESDecryptUtf8(encrypted, key); // decrypt to utf-8 string
let decrypted = AESDecryptAuto(encrypted, key); // decrypt to object, array, number or string if possible 
let decrypted = AESDecryptAuto(encrypted, key, {}, "utf8"); // decrypt to object, array, number or string if possible
```
# Hash (bcrypt)
```javascript
import * as SCryptex from "scryptex";

let hash = SCryptex.hash("test");
console.log(SCryptex.compareHash("test", hash)); // true
console.log(SCryptex.compareHash("abc", hash)); // false
console.log(SCryptex.compareHash("Test", hash)); // false
```