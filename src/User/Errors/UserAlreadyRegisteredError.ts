import {BaseError} from "../../BaseError";

export class UserAlreadyRegisteredError extends BaseError {
    constructor(email: string) {
        super('UserAlreadyRegistered', `User is already Registered`, [
                ['email', email]
            ]
        );
    }
}