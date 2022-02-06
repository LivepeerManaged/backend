import {BaseError} from "../../BaseError";

export class InvalidSignatureError extends BaseError {
    constructor(publicKey, signature) {
        super('InvalidSignature', `Signature validation Failed!`, [
                ['publicKey', publicKey],
                ['signature', signature]
            ]
        );
    }
}