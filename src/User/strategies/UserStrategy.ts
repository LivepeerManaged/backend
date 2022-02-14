import {Injectable, UnauthorizedException} from "@nestjs/common";
import {PassportStrategy} from "@nestjs/passport";
import {ExtractJwt, Strategy} from "passport-jwt";
import {ConfigService} from "@nestjs/config";
import {AuthService} from "../../Auth/services/AuthService";
import {UserService} from "../Services/UserService";

@Injectable()
export class UserStrategy extends PassportStrategy(Strategy, "user") {
    constructor(private configService: ConfigService, private authService: AuthService, private userService: UserService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get<string>('jwt.secret')
        })
    }

    async validate(validationPayload: {aud: string, refreshToken: string}) {
        return await this.userService.getUserById(validationPayload.aud);
    }
}
