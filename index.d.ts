import * as CryptoJS from "crypto-js"
import * as NodeRSA from "node-rsa";
import {Buffer} from "buffer";

export type DataType = Buffer | string | object | Array<any>;

export type RSAKeyFormatType = "openssh" | "pkcs1" | "pkcs8";
export type RSAPublicKeyType = string | Buffer | NodeRSA.KeyComponentsPublic;
export type RSAPrivateKeyType = string | Buffer | NodeRSA.KeyComponentsPrivate;

export class RSA {
    public crypt: NodeRSA;

    public constructor(options?: {publicKey?: RSAPublicKeyType, privateKey?: RSAPrivateKeyType});

    public generateKeyPair(): void;
    public exportPublicKey(format: RSAKeyFormatType, pem?: true): string;
    public exportPrivateKey(format: RSAKeyFormatType, pem?: true): string;
    public exportPublicKey(format: RSAKeyFormatType, pem: false): Buffer;
    public exportPrivateKey(format: RSAKeyFormatType, pem: false): Buffer;
    public exportPublicKey(format: "components", pem?: boolean): NodeRSA.KeyComponentsPublic;
    public exportPrivateKey(format: "components", pem?: boolean): NodeRSA.KeyComponentsPrivate;

    public get publicKey(): string;
    public set publicKey(key: RSAPublicKeyType);
    public get privateKey(): string;
    public set privateKey(key: RSAPrivateKeyType);

    public publicEncrypt(data: DataType, options?: {sourceEncoding?: NodeRSA.Encoding, outputEncoding?: Exclude<NodeRSA.Encoding, "buffer">}): string;
    public publicEncrypt(data: DataType, options: {sourceEncoding?: NodeRSA.Encoding, outputEncoding: "buffer"}): Buffer;
    public privateDecrypt(data: Buffer | string): Buffer;
    public privateDecryptUtf8(data: Buffer | string): string;
    public privateDecryptAuto(data: Buffer | string, encoding: BufferEncoding): {[key: string]: any} | Array<any> | number | string;
    public encrypt(data: DataType): string;
    public decrypt(data: Buffer | string): Buffer;

    public privateEncrypt(data: DataType, options?: {sourceEncoding?: NodeRSA.Encoding, outputEncoding?: Exclude<NodeRSA.Encoding, "buffer">}): string;
    public privateEncrypt(data: DataType, options: {sourceEncoding?: NodeRSA.Encoding, outputEncoding: "buffer"}): Buffer;
    public publicDecrypt(data: Buffer | string): Buffer;
    public publicDecryptUtf8(data: Buffer | string): string;
    public publicDecryptAuto(data: Buffer | string, encoding?: BufferEncoding): {[key: string]: any} | number | string;
    public sign(data: DataType, options?: {sourceEncoding?: NodeRSA.Encoding, outputEncoding?: Exclude<NodeRSA.Encoding, "buffer">}): string;
    public sign(data: DataType, options: {sourceEncoding?: NodeRSA.Encoding, outputEncoding: "buffer"}): Buffer;
    public verify(data: DataType, signature: Buffer, options?: {sourceEncoding?: NodeRSA.Encoding, signatureEncoding?: "buffer"}): boolean;
    public verify(data: DataType, signature: string, options?: {sourceEncoding?: NodeRSA.Encoding, signatureEncoding?: Exclude<NodeRSA.Encoding, "buffer">}): boolean;
}

export function generateRSAKeyPair(format: RSAKeyFormatType | undefined, pem: false): {
    publicKey: Buffer,
    privateKey: Buffer
};

export function generateRSAKeyPair(format?: RSAKeyFormatType, pem?: true): {
    publicKey: string,
    privateKey: string
};

export function generateRSAKeyPair(format: "components", pem?: boolean): {
    publicKey: NodeRSA.KeyComponentsPublic,
    privateKey: NodeRSA.KeyComponentsPrivate
};

export function RSAEncrypt(data: DataType, key: RSAPublicKeyType, options?: {sourceEncoding?: NodeRSA.Encoding, outputEncoding?: Exclude<NodeRSA.Encoding, "buffer">}): string;
export function RSAEncrypt(data: DataType, key: RSAPublicKeyType, options: {sourceEncoding?: NodeRSA.Encoding, outputEncoding: "buffer"}): Buffer;

export function RSAEncrypt(data: DataType, key?: string, options?: {sourceEncoding?: NodeRSA.Encoding, outputEncoding?: Exclude<NodeRSA.Encoding, "buffer">}): {
    data: string,
    publicKey: string,
    privateKey: string
};

export function RSAEncrypt(data: DataType, key: string, options: {sourceEncoding?: NodeRSA.Encoding, outputEncoding: "buffer"}): {
    data: Buffer,
    publicKey: string,
    privateKey: string
};

export function RSADecrypt(data: Buffer | string, key: RSAPrivateKeyType): Buffer;
export function RSADecryptUtf8(data: Buffer | string, key: RSAPrivateKeyType): string;
export function RSADecryptAuto(data: Buffer | string, key: RSAPrivateKeyType, encoding: BufferEncoding): {[key: string]: any} | Array<any> | number | string;

export function RSAEncryptPrivate(data: DataType, key: RSAPublicKeyType, options?: {sourceEncoding?: NodeRSA.Encoding, outputEncoding?: Exclude<NodeRSA.Encoding, "buffer">}): string;
export function RSAEncryptPrivate(data: DataType, key: RSAPublicKeyType, options: {sourceEncoding?: NodeRSA.Encoding, outputEncoding: "buffer"}): Buffer;

export function RSAEncryptPrivate(data: DataType, key?: string, options?: {sourceEncoding?: NodeRSA.Encoding, outputEncoding?: Exclude<NodeRSA.Encoding, "buffer">}): {
    data: string,
    publicKey: string,
    privateKey: string
};

export function RSAEncryptPrivate(data: DataType, key: string, options: {sourceEncoding?: NodeRSA.Encoding, outputEncoding: "buffer"}): {
    data: Buffer,
    publicKey: string,
    privateKey: string
};

export function RSADecryptPublic(data: Buffer | string, key: RSAPrivateKeyType): Buffer;
export function RSADecryptPublicUtf8(data: Buffer | string, key: RSAPrivateKeyType): string;
export function RSADecryptPublicAuto(data: Buffer | string, key: RSAPrivateKeyType, encoding: BufferEncoding): {[key: string]: any} | Array<any> | number | string;

export function RSASign(data: DataType, key: RSAPrivateKeyType, options?: {sourceEncoding?: NodeRSA.Encoding, outputEncoding?: Exclude<NodeRSA.Encoding, "buffer">}): string;
export function RSASign(data: DataType, key: RSAPrivateKeyType, options: {sourceEncoding?: NodeRSA.Encoding, outputEncoding: "buffer"}): Buffer;
export function RSAVerify(data: DataType, key: RSAPublicKeyType, signature: Buffer, options?: {sourceEncoding?: NodeRSA.Encoding, signatureEncoding?: "buffer"}): boolean;
export function RSAVerify(data: DataType, key: RSAPublicKeyType, signature: string, options?: {sourceEncoding?: NodeRSA.Encoding, signatureEncoding?: Exclude<NodeRSA.Encoding, "buffer">}): boolean;

export type AESConfigType = Parameters<typeof CryptoJS.AES.encrypt>[2];
export type AESModeType = typeof CryptoJS.mode.CBC;

export const AESModes: typeof CryptoJS.mode;

export function generatePassphrase(length?: number): string;

export function generateAESKey(passphrase?: string, length?: number, salt?: number | CryptoJS.lib.WordArray): string;

export function AESEncrypt(data: DataType, key?: "", mode?: AESModeType, cfg?: AESConfigType): {
    encrypted: string,
    key: string,
    passphrase: string;
};

export function AESEncrypt(data: DataType, key: string, mode?: AESModeType, cfg?: AESConfigType): string;

export function AESDecrypt(data: string, key: string, mode?: AESModeType, cfg?: AESConfigType): Buffer;

export function AESDecryptUtf8(data: string, key: string, mode?: AESModeType, cfg?: AESConfigType): string;

export function AESDecryptAuto(data: string, key: string, mode: AESModeType | undefined, cfg: AESConfigType | undefined, encoding: BufferEncoding): {[key: string]: any} | Array<any> | number | string;

export class AES {
    public key: string;
    public mode: AESModeType;
    public cfg: AESConfigType;

    public constructor(key?: string, mode?: AESModeType);
    public encrypt(data: DataType, cfg?: AESConfigType): string;
    public decrypt(data: string, cfg?: AESConfigType): Buffer;
    public decryptUtf8(data: string, cfg?: AESConfigType): string;
    public decryptAuto(data: string, cfg: AESConfigType | undefined, encoding: BufferEncoding): {[key: string]: any} | Array<any> | number | string;
}

export function hash(str: string, salt?: number | string): string;
export function compareHash(str: string, hash: string): boolean;