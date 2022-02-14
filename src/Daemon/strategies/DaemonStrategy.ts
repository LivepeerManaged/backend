import {Injectable} from "@nestjs/common";
import {PassportStrategy} from "@nestjs/passport";
import {ExtractJwt, Strategy} from "passport-jwt";
import {ConfigService} from "@nestjs/config";
import {AuthService} from "../../Auth/services/AuthService";
import {DaemonService} from "../Services/DaemonService";
import {Socket} from "net";
import {Request} from "express";
import {ClientRequest} from "http";

@Injectable()
export class DaemonStrategy extends PassportStrategy(Strategy, "daemon") {
    constructor(private configService: ConfigService, private authService: AuthService, private daemonService: DaemonService) {
        super({
            jwtFromRequest: (req) => {
                const request = req.request;
                if(!request['_query'].token || !request['_query'].token)
                    return null;
                return request._query.token;
            },
            ignoreExpiration: false,
            secretOrKey: configService.get<string>('jwt.secret')
        })
    }

    async validate(validationPayload: {aud: string, refreshToken: string}) {
        return await this.daemonService.getDaemonById(validationPayload.aud);
    }
}
