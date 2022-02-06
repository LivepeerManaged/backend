import {Injectable} from "@nestjs/common";
import {EntityNotFoundError, Repository} from "typeorm";
import {DaemonEntity} from "../Entities/DaemonEntity";
import {InjectRepository} from "@nestjs/typeorm";
import {DaemonNotFoundError} from "../Errors/DaemonNotFoundError";
import {DaemonAlreadyExistsError} from "../Errors/DaemonAlreadyExistsError";
import {DaemonSecretMismatchError} from "../Errors/DaemonSecretMismatchError";

@Injectable()
export class DaemonService {
    constructor(@InjectRepository(DaemonEntity) private daemonRepository: Repository<DaemonEntity>) {
    }

    private static generateSecret(length) {
        const randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++)
            result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
        return result;
    }

    async createDaemon(publicKey: string): Promise<DaemonEntity> {
        const daemon = this.daemonRepository.create({
            publicKey: publicKey,
            daemonSecret: DaemonService.generateSecret(32),
        });

        await this.daemonRepository.insert(daemon).catch(e => {
            throw new DaemonAlreadyExistsError(publicKey);
        });
        return daemon;
    }

    async getDaemonByPublicKey(publicKey: string): Promise<DaemonEntity> {
        try {
            return await this.daemonRepository.findOneOrFail({where: {publicKey: publicKey}});
        } catch (e) {
            if(e instanceof EntityNotFoundError) {
                throw new DaemonNotFoundError(publicKey);
            }
        }
    }

    async activateDaemon(publicKey: string, daemonSecret: string): Promise<boolean> {
        const daemonEntity: DaemonEntity = await this.getDaemonByPublicKey(publicKey);

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