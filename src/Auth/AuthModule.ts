import {Module} from "@nestjs/common";
import {AuthService} from "./services/AuthService";
import {JwtModule} from "@nestjs/jwt";
import {PassportModule} from "@nestjs/passport";
import configuration from "../../config/configuration";
import {JwtStrategy} from "./strategies/JwtStrategy";

@Module({
    imports: [
        PassportModule.register({
            defaultStrategy: 'jwt'
        }),
        JwtModule.register({
            secret: configuration().jwtSecret,
        })
    ],
    controllers: [],
    providers: [
        AuthService, JwtStrategy

    ],
})
export class AuthModule {
}
