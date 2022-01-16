import {forwardRef, Module} from "@nestjs/common";
import {TestController} from "./TestController";
import {AuthService} from "./services/AuthService";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {JwtModule, JwtService} from "@nestjs/jwt";
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
    controllers: [TestController],
    providers: [
        AuthService, JwtStrategy

    ],
})
export class AuthModule {
}
