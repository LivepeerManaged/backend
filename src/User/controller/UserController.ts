import {Body, Controller, Post} from "@nestjs/common";
import {CreateUserDto} from "../dto/CreateUserDto";
import {UserService} from "../Services/UserService";
import {LoginUserDto} from "../dto/LoginUserDto";

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {
    }

    @Post('login')
    public login(@Body() loginUserDto: LoginUserDto) {
        return this.userService.login(loginUserDto.email, loginUserDto.password)
    }

    @Post('register')
    public register(@Body() createUserDto: CreateUserDto) {
        return this.userService.createUser(createUserDto.email, createUserDto.password);
    }
}