import {Body, Controller, Post} from "@nestjs/common";
import {DaemonService} from "../Services/DaemonService";
import {InvalidSignatureError} from "../Errors/InvalidSignatureError";
import {ActivateDaemonDto} from "../dto/ActivateDaemonDto";

const crypto = require("crypto");

@Controller('daemon')
export class DaemonController {
    constructor(private daemonService: DaemonService) {
    }

    @Post('activateDaemon')
    public async activateDaemon(@Body() activateDaemonDto: ActivateDaemonDto) {
        const publicKey = this.removeWhitespaces(activateDaemonDto.publicKey);

        if (!this.verifySignature(publicKey, activateDaemonDto.daemonSecret, activateDaemonDto.signature)) {
            throw new InvalidSignatureError(publicKey, activateDaemonDto.signature)
        }

        return await this.daemonService.activateDaemon(publicKey, activateDaemonDto.daemonSecret);
    }

    private removeWhitespaces = (s: string) => s.replace(/ /g, '');

    private verifySignature(publicKey: string, data: string, signature: string) {
        publicKey = this.removeWhitespaces(publicKey);

        if(!publicKey.startsWith("-----BEGIN RSA PUBLIC KEY-----"))
          publicKey = this.convertDerPublicToPem(publicKey);

        return crypto.verify("RSA-SHA1", Buffer.from(data), crypto.createPublicKey(publicKey), Buffer.from(signature, "base64"));
    }

    private convertDerPublicToPem(der) {
        der = this.removeWhitespaces(der);
        const prefix = '-----BEGIN RSA PUBLIC KEY-----\n';
        const postfix = '-----END RSA PUBLIC KEY-----';
        return prefix + der.match(/.{0,64}/g).join('\n') + postfix;
    }
}
