import {Module} from "@nestjs/common";
import {AuthService} from "./services/AuthService";
import {JwtModule} from "@nestjs/jwt";
import {ConfigService} from "@nestjs/config";

@Module({
    imports: [
        JwtModule.registerAsync({
            useFactory: (configService: ConfigService) => {
                return {
                    secret: configService.get<string>('jwt.secret'),
                };
            },
            inject: [ConfigService],
        })
    ],
    controllers: [],
    providers: [
        AuthService
    ],
    exports: [
        AuthService
    ]
})
export class AuthModule {}
