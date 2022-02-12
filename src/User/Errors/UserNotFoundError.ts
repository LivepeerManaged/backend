import {BaseError} from "../../BaseError";

export class UserNotFoundError extends BaseError {
    constructor(email: string) {
        super('UserNotFound', `User not found`, [
                ['email', email]
            ]
        );
    }
}