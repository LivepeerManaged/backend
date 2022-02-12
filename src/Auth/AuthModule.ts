import {forwardRef, Module} from "@nestjs/common";
import {AuthService} from "./services/AuthService";
import {JwtModule} from "@nestjs/jwt";
import {PassportModule} from "@nestjs/passport";
import {JwtStrategy} from "./strategies/JwtStrategy";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {UserModule} from "../User/UserModule";

@Module({
    imports: [
        PassportModule.register({
            defaultStrategy: 'jwt',
        }),
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
        AuthService, JwtStrategy
    ],
    exports: [
        AuthService
    ]
})
export class AuthModule {
    onModuleInit(): any {
        console.log("test");
        /*
        if (!fs.existsSync('./keys/server/')) {
        fs.mkdir('./keys/server/', {recursive: true}, err => {
            console.error(err);
            const keyPair = crypto.generateKeyPairSync('rsa', {
                modulusLength: 4096,
            });
            fs.writeFileSync('./keys/server/public', keyPair.publicKey, {encoding: "base64"});
            fs.writeFileSync('./keys/server/private', keyPair.privateKey, {encoding: "base64"});
        });
    }
     */
    }


}
