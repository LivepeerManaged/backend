import {Body, Controller, Param, Post, Req, UseGuards} from "@nestjs/common";
import {DaemonService} from "../Services/DaemonService";
import {Daemon} from "../Entities/Daemon";
import {DaemonNotFoundError} from "../Errors/DaemonNotFoundError";
import {InvalidSignatureError} from "../Errors/InvalidSignatureError";
import {AuthGuard} from "@nestjs/passport";
import {JwtAuthGuard} from "../../Auth/guards/JwtAuthGuard";
import {Context} from "@nestjs/graphql";
import {Request} from "express";
import {CurrentUser} from "../../User/decorator/CurrentUser";
import {User} from "../../User/Entities/User";

const crypto = require("crypto");

@Controller('daemon')
export class DaemonController {
    constructor(private daemonService: DaemonService) {
    }

    @Post('createDaemon')
    @UseGuards(JwtAuthGuard)
    public async createDaemon(@Body('publicKey') publicKey, @CurrentUser() user: User): Promise<Daemon | DaemonNotFoundError> {
        return await this.daemonService.createDaemon(user.id, publicKey);
    }


    @Post('activateDaemon')
    public async activateDaemon(@Body('publicKey') publicKey: string, @Body('daemonSecret') daemonSecret: string, @Body('signature') signature: string) {
        publicKey = this.removeWhitespaces(publicKey);

        if (!publicKey) {
            return "Public key missing";
        }

        if (!daemonSecret) {
            return "daemonSecret missing";
        }

        if (!signature) {
            return "signature missing";
        }

        if (!this.verifySignature(publicKey, daemonSecret, signature)) {
            throw new InvalidSignatureError(publicKey, signature)
        }

        return await this.daemonService.activateDaemon(publicKey, daemonSecret);
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
