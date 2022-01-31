import {Module} from "@nestjs/common";
import {AuthModule} from "../Auth/AuthModule";
import {TypeOrmModule} from "@nestjs/typeorm";
import {DaemonController} from "./Controller/DaemonController";
import {DaemonService} from "./Services/DaemonService";
import {DaemonEntity} from "./Entities/DaemonEntity";

@Module({
    imports: [
        TypeOrmModule.forFeature([DaemonEntity])
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
