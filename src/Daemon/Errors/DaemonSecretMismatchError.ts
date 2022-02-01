import {BaseError} from "../../BaseError";

export class DaemonSecretMismatchError extends BaseError {
    constructor(publicKey, realSecret, providedSecret) {
        super(`Daemon Secret Mismatch!`, [
                ['publicKey', publicKey],
                ['providedSecret', providedSecret],
                ['realSecret', realSecret]
            ]
        );
    }
}