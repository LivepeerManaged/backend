import {MessageBody, SubscribeMessage, WebSocketGateway} from "@nestjs/websockets";
import {Param, UseGuards} from "@nestjs/common";
import {DaemonAuthGuard} from "../guards/DaemonAuthGuard";
import {CurrentDaemon} from "../decorator/CurrentDaemon";
import {Daemon} from "../Entities/Daemon";

@WebSocketGateway({namespace: 'daemon'})
@UseGuards(DaemonAuthGuard)
export class DaemonGateway {
    @SubscribeMessage('test')
    handleEvent(@MessageBody() data: string, @CurrentDaemon() daemon: Daemon) {
        console.log(daemon.id);
        console.log(data);
    }
}