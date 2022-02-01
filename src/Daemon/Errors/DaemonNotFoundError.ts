import {BaseError} from "../../BaseError";

export class DaemonNotFoundError extends BaseError {
    constructor(publicKey) {
        super(`Daemon not Found!`, [
                ['publicKey', publicKey]
            ]
        );
    }
}