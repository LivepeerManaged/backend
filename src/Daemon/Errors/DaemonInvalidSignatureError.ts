import {BaseError} from "../../BaseError";

export class DaemonInvalidSignatureError extends BaseError {
    constructor(publicKey, signature) {
        super(`Daemon Signature Failed!`, [
                ['publicKey', publicKey],
                ['signature', signature]
            ]
        );
    }
}