import {BaseError} from "../../BaseError";

export class DaemonAlreadyExistsError extends BaseError {
    constructor(publicKey) {
        super('DaemonAlreadyExists', `Daemon is already Registered`, [
                ['publicKey', publicKey]
            ]
        );
    }
}