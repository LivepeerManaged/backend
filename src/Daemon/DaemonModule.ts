import {forwardRef, Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {DaemonController} from "./Controller/DaemonController";
import {DaemonService} from "./Services/DaemonService";
import {Daemon} from "./Entities/Daemon";
import {UserModule} from "../User/UserModule";
import {AuthModule} from "../Auth/AuthModule";

@Module({
    imports: [
        TypeOrmModule.forFeature([Daemon]),
        forwardRef(() => UserModule),
        forwardRef(() => AuthModule),
    ],
    controllers: [
        DaemonController
    ],
    providers: [
        DaemonService
    ],
    exports: [
        DaemonService
    ]
})
export class DaemonModule {

}
