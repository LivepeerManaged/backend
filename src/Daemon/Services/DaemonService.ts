import {Injectable} from "@nestjs/common";
import {EntityNotFoundError, Repository} from "typeorm";
import {Daemon} from "../Entities/Daemon";
import {InjectRepository} from "@nestjs/typeorm";
import {DaemonNotFoundError} from "../Errors/DaemonNotFoundError";
import {DaemonSecretMismatchError} from "../Errors/DaemonSecretMismatchError";
import {UserService} from "../../User/Services/UserService";
import {AuthService} from "../../Auth/services/AuthService";

@Injectable()
export class DaemonService {
    constructor(@InjectRepository(Daemon) private daemonRepository: Repository<Daemon>, private userService: UserService, private authService: AuthService) {
    }

    private static generateSecret(length) {
        const randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++)
            result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
        return result;
    }

    /**
     * Created a daemon for given userId and returns the secret if successful
     * @param userId
     * @returns secret
     */
    async createDaemon(userId: string): Promise<string> {
        const daemon = this.daemonRepository.create({
            secret: DaemonService.generateSecret(32),
            user: await this.userService.getUserById(userId)
        });

        await this.daemonRepository.insert(daemon);

        return daemon.secret;
    }

    async getDaemonById(id: string): Promise<Daemon> {
        const foundDaemon = await this.daemonRepository.findOne({where: {id: id}});

        if (!foundDaemon)
            throw new DaemonNotFoundError(id);

        return foundDaemon;
    }

    async login(id: string, secret: string): Promise<string> {
        const daemonByPublicKey = await this.getDaemonById(id);

        if (secret !== daemonByPublicKey.secret)
            throw new DaemonSecretMismatchError(id, secret);

        return this.authService.signJwt({
            aud: daemonByPublicKey.id
        })
    }
}