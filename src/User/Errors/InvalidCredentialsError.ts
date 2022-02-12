import {BaseError} from "../../BaseError";

export class InvalidCredentials extends BaseError {
    constructor(email: string) {
        super('InvalidCredentials', `Invalid Credentials`, [
                ['email', email]
            ]
        );
    }
}