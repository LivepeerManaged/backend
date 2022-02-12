import {Injectable} from "@nestjs/common";
import {Repository} from "typeorm";
import {User} from "../Entities/User";
import {UserAlreadyRegisteredError} from "../Errors/UserAlreadyRegisteredError";
import {InjectRepository} from "@nestjs/typeorm";
import {AuthService} from "../../Auth/services/AuthService";
import {UserNotFoundError} from "../Errors/UserNotFoundError";
import {InvalidCredentials} from "../Errors/InvalidCredentialsError";

const bcrypt = require('bcrypt');

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private userRepository: Repository<User>, private authService: AuthService) {
    }

    async createUser(email: string, password: string) {
        const user = this.userRepository.create({
            email: email.toLocaleLowerCase(),
            password: (await bcrypt.hash(password, 12)),
        });

        await this.userRepository.insert(user).catch(e => {
            throw new UserAlreadyRegisteredError(email)
        });
        return user;
    }

    async getUserById(id: string) {
        return await this.userRepository.findOne(id);
    }

    async login(email: string, password: string) {
        const user = await this.userRepository.findOne({where: {email: email}});

        if (!user || !await bcrypt.compare(password, user.password))
            throw new InvalidCredentials(email);

        return this.authService.signJwt({
            id: user.id
        });
    }
}