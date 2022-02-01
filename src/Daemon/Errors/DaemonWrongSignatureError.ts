import {BaseError} from "../../BaseError";

export class DaemonWrongSignatureError extends BaseError {
    constructor(publicKey, signature) {
        super(`Daemon Signature Failed!`, [
                ['publicKey', publicKey],
                ['signature', signature]
            ]
        );
    }
}