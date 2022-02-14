import {Injectable} from "@nestjs/common";
import {EntityNotFoundError, Repository} from "typeorm";
import {Daemon} from "../Entities/Daemon";
import {InjectRepository} from "@nestjs/typeorm";
import {DaemonNotFoundError} from "../Errors/DaemonNotFoundError";
import {DaemonAlreadyExistsError} from "../Errors/DaemonAlreadyExistsError";
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

    async createDaemon(userId: string, publicKey: string): Promise<Daemon> {
        const daemon = this.daemonRepository.create({
            publicKey: publicKey,
            daemonSecret: DaemonService.generateSecret(32),
            user: await this.userService.getUserById(userId)
        });

        await this.daemonRepository.insert(daemon).catch(e => {
            throw new DaemonAlreadyExistsError(publicKey);
        });

        return daemon;
    }

    async getDaemonByPublicKey(publicKey: string): Promise<Daemon> {
        const foundDaemon = await this.daemonRepository.findOne({where: {publicKey: publicKey}});

        if (!foundDaemon)
            throw new DaemonNotFoundError(publicKey);

        return foundDaemon;
    }

    async login(publicKey: string, secret: string): Promise<string> {
        const daemonByPublicKey = await this.getDaemonByPublicKey(publicKey);

        if (secret !== daemonByPublicKey.daemonSecret)
            throw new DaemonSecretMismatchError(publicKey, secret);

        return this.authService.signJwt({
            id: daemonByPublicKey.id
        })
    }
}