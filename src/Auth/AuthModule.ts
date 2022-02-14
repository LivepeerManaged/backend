import {forwardRef, Module} from "@nestjs/common";
import {AuthService} from "./services/AuthService";
import {JwtModule} from "@nestjs/jwt";
import {PassportModule} from "@nestjs/passport";
import {UserStrategy} from "../User/strategies/UserStrategy";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {UserModule} from "../User/UserModule";

@Module({
    imports: [
        PassportModule.register({}),
        JwtModule.registerAsync({
            useFactory: (configService: ConfigService) => {
                return {
                    secret: configService.get<string>('jwt.secret'),
                };
            },
            inject: [ConfigService],
        }),
        forwardRef(() => UserModule)
    ],
    controllers: [],
    providers: [
        AuthService, UserStrategy
    ],
    exports: [
        AuthService
    ]
})
export class AuthModule {}
