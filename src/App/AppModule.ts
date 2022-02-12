import {Module} from "@nestjs/common";
import {ConfigModule, ConfigService} from "@nestjs/config";
import configuration from "../../config/configuration";
import {AuthModule} from "../Auth/AuthModule";
import {TypeOrmConnectionFactory, TypeOrmModule} from "@nestjs/typeorm";
import {DaemonModule} from "../Daemon/DaemonModule";
import {UserModule} from "../User/UserModule";
import {ConnectionOptions} from "typeorm";

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [configuration],
            isGlobal: true
        }),
        TypeOrmModule.forRootAsync({
            // @ts-ignore
            useFactory: (configService: ConfigService) => {
                return {
                    autoLoadEntities: true,
                    entities: [
                        "dist/src/**/Entities/*.js",
                    ],
                    ...configService.get<ConnectionOptions>('database'),
                }
            },
            inject: [ConfigService],

        }),
        AuthModule,
        DaemonModule,
        UserModule
    ],
    controllers: [],
})
export class AppModule {}
