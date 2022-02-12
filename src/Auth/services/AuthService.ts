import {Injectable} from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";
import {ConfigService} from "@nestjs/config";
import {KeyObject, publicDecrypt} from "crypto";
import {writeFileSync} from "fs";
const crypto = require("crypto");

@Injectable()
export class AuthService {

    constructor(private configService: ConfigService, private readonly jwtService: JwtService) {
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
