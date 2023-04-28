![SCryptex docs](./SCryptex.png)
# Installation
## NPM
```
npm i scryptex
```
```javascript
import * as SCryptex from "scryptex"; // esm
const SCryptex = require("scryptex"); // cjs
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
## RSAList class
```javascript
let rsaList = new SCryptex.RSAList();
```
### Add
```javascript
let elem = rsaList.add(); // will add new RSA and return added elem and remove it after 2 hours
let elem = rsaList.add(new RSA()); // will add value from arg and return added elem and remove it after 2 hours
let elem = rsaList.add(new RSA(), 0); // will add new RSA and return added elem without removing after delay
let elem = rsaList.add(new RSA(), 10); // will add new RSA and return added elem and remove it after 10 ms
```
### Decrypting
```javascript
let decrypted = rsaList.decrypt(encrypted); // will decrypt using one of private keys
let decrypted = rsaList.decrypt(encrypted, true); // will decrypt using one of private keys and remove this key
// if key for data not in rsaList, method will return undefind
```
## RSAPost
> Function will request public key, encrypt request body and send it with POST
```javascript
SCryptex.RSAPost(data, "http://localhost:8080/encrypted_data_handler",
    "http://localhost:8080/get_public_key").then(({data, status, headers, response}) => {
    console.log(data);
    console.log(status);
    console.log(headers);
});
```