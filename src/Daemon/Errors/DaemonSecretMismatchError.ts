import {BaseError} from "../../BaseError";

export class DaemonSecretMismatchError extends BaseError {
    constructor(publicKey, providedSecret) {
        super('DaemonSecretMismatch', `Wrong secret for Daemon!`, [
                ['publicKey', publicKey],
                ['providedSecret', providedSecret],
            ]
        );
    }
}