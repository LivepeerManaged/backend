import {Injectable} from "@nestjs/common";
import {Repository} from "typeorm";
import {User} from "../Entities/User";
import {UserAlreadyRegisteredError} from "../Errors/UserAlreadyRegisteredError";
import {InjectRepository} from "@nestjs/typeorm";
import {AuthService} from "../../Auth/services/AuthService";
import {InvalidCredentials} from "../Errors/InvalidCredentialsError";

const bcrypt = require('bcrypt');

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private userRepository: Repository<User>, private authService: AuthService) {
    }

    /**
     * Creates user and returns JWT Token if successful
     * @param email
     * @param password
     * @return JWT Token
     */
    async createUser(email: string, password: string): Promise<string> {
        const user = this.userRepository.create({
            email: email.toLocaleLowerCase(),
            password: (await bcrypt.hash(password, 12)),
        });

        await this.userRepository.insert(user).catch(e => {
            throw new UserAlreadyRegisteredError(email)
        });
        return this.authService.signJwt({
            id: user.id
        });
    }

    /**
     * Gets user by ID
     * @param id
     * @return User
     */
    async getUserById(id: string): Promise<User> {
        return await this.userRepository.findOne(id);
    }

    /**
     * Returns JWT Token if credentials are correct
     * @param email
     * @param password
     * @return JWT Token
     */
    async login(email: string, password: string): Promise<string> {
        const user = await this.userRepository.findOne({where: {email: email}});

        if (!user || !await bcrypt.compare(password, user.password))
            throw new InvalidCredentials(email);

        return this.authService.signJwt({
            id: user.id
        });
    }
}