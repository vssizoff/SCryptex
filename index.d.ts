export function hash(str: string, salt: number | string): string;

export function compareHash(str: string, hash: string): boolean;

export function generateRSAKeyPair(): {
    publicKey: string,
    privateKey: string
};

export function RSAEncrypt(data: string): string;

export function RSAEncrypt(data: string, key: string): {
    data: string,
    publicKey: string,
    privateKey: string
};

export function RSADecrypt(data: string, key: string): string;