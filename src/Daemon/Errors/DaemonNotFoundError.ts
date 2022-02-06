import {BaseError} from "../../BaseError";

export class DaemonNotFoundError extends BaseError {
    constructor(publicKey) {
        super('DaemonNotFound', `Daemon was not found!`, [
                ['publicKey', publicKey]
            ]
        );
    }
}