import {Body, Controller, Post, UseGuards} from "@nestjs/common";
import {CreateUserDto} from "../dto/CreateUserDto";
import {UserService} from "../Services/UserService";
import {LoginUserDto} from "../dto/LoginUserDto";
import {DaemonService} from "../../Daemon/Services/DaemonService";
import {JwtAuthGuard} from "../../Auth/guards/JwtAuthGuard";
import {CurrentUser} from "../decorator/CurrentUser";
import {User} from "../Entities/User";
import {Daemon} from "../../Daemon/Entities/Daemon";
import {DaemonAlreadyExistsError} from "../../Daemon/Errors/DaemonAlreadyExistsError";

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

    @Post('createDaemon')
    @UseGuards(JwtAuthGuard)
    public async createDaemon(@Body('publicKey') publicKey, @CurrentUser() user: User): Promise<Daemon> {
        return await this.daemonService.createDaemon(user.id, publicKey);
    }
}