import {BaseError} from "../../BaseError";

export class DaemonAlreadyExistsError extends BaseError {
    constructor(publicKey) {
        super(`Daemon already Registered`, [
                ['publicKey', publicKey]
            ]
        );
    }
}