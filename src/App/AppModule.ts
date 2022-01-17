import {Module} from "@nestjs/common";
import {GraphQLModule} from "@nestjs/graphql";
import {TestResolver} from "./resolver/TestResolver";
import {ConfigModule, ConfigService} from "@nestjs/config";
import configuration from "../../config/configuration";
import {AuthModule} from "../Auth/AuthModule";
import {readFileSync, writeFile, writeFileSync} from "fs";
import * as crypto from "crypto";
import {JsonWebKeyInput} from "crypto";
import {isKeyObject} from "util/types";
import {addPackageJsonDependency} from "@nestjs/schematics/dist/utils/dependencies.utils";
import * as fs from "fs";
var jwkToPem = require('jwk-to-pem')

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
        AuthModule
    ],
    controllers: [],
    providers: [TestResolver],
})
export class AppModule {
    constructor() {
        //console.log(crypto.publicEncrypt(buffer.toString(), Buffer.from('Hello there :>')).toString('base64'))
        //console.log(crypto.publicEncrypt(jwkToPem(jwk), Buffer.from('aaa')).toString('base64'));
    }

}
