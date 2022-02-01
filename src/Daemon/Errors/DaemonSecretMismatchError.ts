import {BaseError} from "../../BaseError";

export class DaemonSecretMismatchError extends BaseError {
    constructor(publicKey, providedSecret) {
        super(`Daemon Secret Mismatch!`, [
                ['publicKey', publicKey],
                ['providedSecret', providedSecret],
            ]
        );
    }
}