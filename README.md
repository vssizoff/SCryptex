![SCryptex docs](./SCryptex.png)
# Installation
## NPM
```
npm i scryptex
```

```javascript
import * as SCryptex from "index"; // esm
const SCryptex = require("index"); // cjs
```
# Hash
```javascript
let data = "test", data0 = data, data1 = "Test";
let h = SCryptex.hash(data); // data will be hashed
console.log(SCryptex.compareHash(data0, h)); // true
console.log(SCryptex.compareHash(data1, h)); // false
```
# RSA
## Generating key pair
```javascript
let {privateKey, publicKey} = SCryptex.generateRSAKeyPair();
```
## Encrypting
```javascript
let encrypted = SCryptex.RSAEncrypt(data, publicKey); // data will be encrypted
```
## Decrypting
```javascript
let decrypted = SCryptex.RSADecrypt(encrypted, privateKey);
```
## Generating keys and encrypting
```javascript
let {privateKey, publicKey, data: encrypted} = SCryptex.RSAEncrypt(data); // data will be encrypted
```
## RSA class
```javascript
let rsa = new SCryptex.RSA(); // Keys will be generated
let rsa = new SCryptex.RSA(publicKey, privateKey); // or with generated keys
let rsa = new SCryptex.RSA(publicKey); // or with public key (Decryption is not available)
```
### Encrypting
```javascript
let encrypted = rsa.encrypt(data); // data will be encrypted
```
### Decrypting
```javascript
let decrypted = rsa.decrypt(encrypted);
```