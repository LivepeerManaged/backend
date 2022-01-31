import {Module} from "@nestjs/common";
import {TestResolver} from "./resolver/TestResolver";
import {ConfigModule} from "@nestjs/config";
import configuration from "../../config/configuration";
import {AuthModule} from "../Auth/AuthModule";
import {TypeOrmModule} from "@nestjs/typeorm";
import {DaemonModule} from "../Daemon/DaemonModule";

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [configuration],
            isGlobal: true
        }),
        // @ts-ignore
        TypeOrmModule.forRoot({
            autoLoadEntities: true,
            entities: [
                "dist/src/**/Entities/*.js",
            ],
            ...configuration().database,
        }),
        AuthModule,
        DaemonModule
    ],
    controllers: [],
    providers: [TestResolver],
})
export class AppModule {}
