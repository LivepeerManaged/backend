import {Body, Controller, Post} from "@nestjs/common";
import {DaemonService} from "../Services/DaemonService";
import {DaemonLoginDto} from "../dto/DaemonLoginDto";

const crypto = require("crypto");

@Controller('daemon')
export class DaemonController {
    constructor(private daemonService: DaemonService) {
    }

    @Post('login')
    public async login(@Body() {id, secret}: DaemonLoginDto) {
        /*
            if (!this.verifySignature(id, secret, signature)) {
                throw new InvalidSignatureError(id, signature)
            }
         */

        return this.daemonService.login(id, secret)
    }

    private removeWhitespaces = (s: string) => s.replace(/ /g, '');

    private verifySignature(publicKey: string, data: string, signature: string) {
        publicKey = this.removeWhitespaces(publicKey);

        if (!publicKey.startsWith("-----BEGIN RSA PUBLIC KEY-----"))
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
