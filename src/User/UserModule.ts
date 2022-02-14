import {forwardRef, Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserService} from "./Services/UserService";
import {User} from "./Entities/User";
import {AuthModule} from "../Auth/AuthModule";
import {LoggingModule} from "../Logger/LoggingModule";
import {UserController} from "./controller/UserController";
import {DaemonModule} from "../Daemon/DaemonModule";
import {UserStrategy} from "./strategies/UserStrategy";

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        forwardRef(() => AuthModule),
        forwardRef(() => DaemonModule),
        LoggingModule.register({
            name: 'UserModule'
        })
    ],
    controllers: [
        UserController
    ],
    providers: [
        UserService, UserStrategy
    ],
    exports: [
        UserService
    ]
})
export class UserModule {}
