import {Injectable} from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";

const crypto = require("crypto");

@Injectable()
export class AuthService {

    constructor(private readonly jwtService: JwtService) {
    }

    signJwt(data: any) {
        return this.jwtService.sign(data, {
            expiresIn: '2h',
        })
    }

    verifyJwt(jwt: string) {
        return this.jwtService.verify(jwt);
    }
}
