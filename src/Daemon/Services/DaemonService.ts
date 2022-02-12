import {Injectable} from "@nestjs/common";
import {EntityNotFoundError, Repository} from "typeorm";
import {Daemon} from "../Entities/Daemon";
import {InjectRepository} from "@nestjs/typeorm";
import {DaemonNotFoundError} from "../Errors/DaemonNotFoundError";
import {DaemonAlreadyExistsError} from "../Errors/DaemonAlreadyExistsError";
import {DaemonSecretMismatchError} from "../Errors/DaemonSecretMismatchError";
import {UserService} from "../../User/Services/UserService";

@Injectable()
export class DaemonService {
    constructor(@InjectRepository(Daemon) private daemonRepository: Repository<Daemon>, private userService: UserService) {
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
        try {
            return await this.daemonRepository.findOneOrFail({where: {publicKey: publicKey}});
        } catch (e) {
            if(e instanceof EntityNotFoundError) {
                throw new DaemonNotFoundError(publicKey);
            }
        }
    }

    async activateDaemon(publicKey: string, daemonSecret: string): Promise<boolean> {
        const daemonEntity: Daemon = await this.getDaemonByPublicKey(publicKey);

        if(daemonSecret != daemonEntity.daemonSecret) {
            throw new DaemonSecretMismatchError(publicKey, daemonSecret);
        }

        daemonEntity.activated = true;

        await this.daemonRepository.save(daemonEntity);
        return true;
    }

    /*
    private convertDerPublicToPem(der) {
        const prefix = '-----BEGIN RSA PUBLIC KEY-----\n';
        const postfix = '-----END RSA PUBLIC KEY-----';
        return prefix + der.match(/.{0,64}/g).join('\n') + postfix;
    }
     */
}