![SCryptex docs](./SCryptex.png)
# Installation
## NPM
```
npm i scryptex
```
## CDN
```html
<script src="https://cdn.jsdelivr.net/npm/cryptojs@2.5.3/lib/Crypto.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/bcrypt@5.1.0/bcrypt.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/srequest_js/cdn.js"></script>
<script src="https://cdn.jsdelivr.net/npm/scryptex/cdn.js"></script>
```
# Hash
```javascript
let data = "test", data0 = data, data1 = "Test";
let h = hash(data); // data will be hashed
console.log(compareHash(data0, h)); // true
console.log(compareHash(data1, h)); // false
```
# RSA
## Generating key pair
```javascript
let {privateKey, publicKey} = generateRSAKeyPair();
```
## Encrypting
```javascript
let encrypted = RSAEncrypt(data, publicKey); // data will be encrypted
```
## Decrypting
```javascript
let decrypted = RSADecrypt(encrypted, privateKey);
```
## Generating keys and encrypting
```javascript
let {privateKey, publicKey, data: encrypted} = RSAEncrypt(data); // data will be encrypted
```
## RSA class
```javascript
let rsa = new RSA(); // Keys will be generated
let rsa = new RSA(publicKey, privateKey); // or with generated keys
let rsa = new RSA(publicKey); // or with public key (Decryption is not available)
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
let rsaList = new RSAList();
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
let decrypted = rsaList.decrypt(encrypted) // will decrypt using one of private keys
let decrypted = rsaList.decrypt(encrypted, true) // will decrypt using one of private keys and remove this key
// if key for data not in rsaList, method will return undefind
```
## RSAPost
> Function will request public key, encrypt request body and send it with POST
```javascript
let promise = RSAPost(data, "http://localhost:8080/encrypted_data_handler",
    "http://localhost:8080/get_public_key")
promise.then(({data, status, headers, response}) => {
    console.log(data);
    console.log(status);
    console.log(headers);
});
```