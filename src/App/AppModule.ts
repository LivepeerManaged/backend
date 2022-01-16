import {Module} from "@nestjs/common";
import {GraphQLModule} from "@nestjs/graphql";
import {TestResolver} from "./resolver/TestResolver";
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
    providers: [TestResolver],
})
export class AppModule {}
