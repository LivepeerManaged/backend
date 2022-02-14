import {Body, Controller, Get, Param, Post, UseGuards} from "@nestjs/common";
import {CreateUserDto} from "../dto/CreateUserDto";
import {UserService} from "../Services/UserService";
import {LoginUserDto} from "../dto/LoginUserDto";
import {DaemonService} from "../../Daemon/Services/DaemonService";
import {UserAuthGuard} from "../guards/UserAuthGuard";
import {CurrentUser} from "../decorator/CurrentUser";
import {User} from "../Entities/User";
import {Daemon} from "../../Daemon/Entities/Daemon";
import {DaemonNotFoundError} from "../../Daemon/Errors/DaemonNotFoundError";

@Controller('user')
export class UserController {
    constructor(private userService: UserService, private daemonService: DaemonService) {
    }

    @Post('login')
    public login(@Body() {email, password}: LoginUserDto) {
        return this.userService.login(email, password)
    }

    @Post('register')
    public register(@Body() {email, password}: CreateUserDto) {
        return this.userService.createUser(email, password);
    }

    @Post('daemon')
    @UseGuards(UserAuthGuard)
    public async createDaemon(@CurrentUser() user: User): Promise<string> {
        return this.daemonService.createDaemon(user.id);
    }

    @Get('daemon')
    @UseGuards(UserAuthGuard)
    public async listDaemons(@CurrentUser() user: User): Promise<Array<Daemon>> {
        return user.daemons;
    }

    @Get('daemon/:id')
    @UseGuards(UserAuthGuard)
    public async getDaemon(@Param('id') id: string, @CurrentUser() user: User): Promise<Daemon> {
        let daemon = user.daemons.find(daemon => daemon.id === id);

        if(!daemon)
            throw new DaemonNotFoundError(id);

        return daemon;
    }
}