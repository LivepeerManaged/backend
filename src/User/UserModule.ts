import {forwardRef, Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserService} from "./Services/UserService";
import {User} from "./Entities/User";
import {AuthModule} from "../Auth/AuthModule";
import {LoggingService} from "../Logger/Services/loggingService";
import {LoggingModule} from "../Logger/LoggingModule";
import {UserController} from "./controller/UserController";
import {DaemonModule} from "../Daemon/DaemonModule";

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        forwardRef(() => AuthModule),
        forwardRef(() => DaemonModule),
        LoggingModule.register({
            name: 'DaemonModule'
        }),
    ],
    controllers: [
        UserController
    ],
    providers: [
        UserService
    ],
    exports: [
        UserService
    ]
})
export class UserModule {
    constructor(private userService: UserService, private logger: LoggingService) {
        const startTime = performance.now();
        //logger.trace(`Took ${performance.now() - startTime} ms to createUser`)

        //userService.createUser("Test@web.de", "123456");
    }
}
