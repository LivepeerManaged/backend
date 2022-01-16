import {Module} from "@nestjs/common";
import {GraphQLModule} from "@nestjs/graphql";
import {ConfigModule, ConfigService} from "@nestjs/config";
import configuration from "../../config/configuration";

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [configuration],
            isGlobal: true
        }),
        // TypeOrmModule.forRoot(),
        GraphQLModule.forRoot({
            autoSchemaFile: true,
            //context: ({req}) => ({currentUser: req.user}),
        }),
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
