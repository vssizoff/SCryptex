import * as CryptoJS from "crypto-js"

export function hash(str: string, salt: number | string): string;

export function compareHash(str: string, hash: string): boolean;

export function generateRSAKeyPair(): {
    publicKey: string,
    privateKey: string
};

export function RSAEncrypt(data: string, key: string): string;

export function RSAEncrypt(data: string): {
    data: string,
    publicKey: string,
    privateKey: string
};

export function RSADecrypt(data: string, key: string): string;

export class RSA {
    public publicKey?: string;
    public privateKey?: string;

    public constructor(publicKey?: string, privateKey?: string);
    public encrypt(data: string): string;
    public decrypt(data: string): string;
}

export function generatePassphrase(length: number): string;

export function generateAESKey(passphrase: string, length: number, salt: number | CryptoJS.lib.WordArray): string;

export function AESEncrypt(data: string, key: string): string;

export function AESEncrypt(data: string): {
    encrypted: string,
    key: string,
    passphrase: string;
};

export function AESDecrypt(data: string, key: string): string;

export class AES {
    public key?: string;

    public constructor(key?: string);
    public encrypt(data: string): string;
    public decrypt(data: string): string;
}