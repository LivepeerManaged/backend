import {Module} from "@nestjs/common";
import {AuthModule} from "../Auth/AuthModule";
import {TypeOrmModule} from "@nestjs/typeorm";
import {DaemonController} from "./Controller/DaemonController";
import {DaemonService} from "./Services/DaemonService";
import {Daemon} from "./Entities/Daemon";

@Module({
    imports: [
        TypeOrmModule.forFeature([Daemon])
    ],
    controllers: [
        DaemonController
    ],
    providers: [
        DaemonService
    ],
})
export class DaemonModule {

}
