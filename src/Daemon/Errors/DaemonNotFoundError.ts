import {BaseError} from "../../BaseError";

export class DaemonNotFoundError extends BaseError {
    constructor(id: string) {
        super('DaemonNotFound', `Daemon was not found!`, [
                ['publicKey', id]
            ]
        );
    }
}