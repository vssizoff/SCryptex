import {default as bcryptjs} from "bcryptjs";

export function hash(str, salt = 16) {
    return bcryptjs.hashSync(str, salt);
}

export function compareHash(str, hash) {
    return bcryptjs.compareSync(str, hash);
}