import {Body, Controller, Get, Header, Param, Post, Query, UploadedFile, UseInterceptors} from '@nestjs/common';
import {AuthService} from "./services/AuthService";
import * as crypto from "crypto";
import {FileInterceptor} from "@nestjs/platform-express";

@Controller()
export class TestController {
    constructor(private authService: AuthService) {
    }

    @Get('test')
    public testa() {
        return this.authService.signJwt('0x00')
    }

    @Post('encrypt')
    public encrypt(@Body('cert') cert, @Body('message') message) {
        return crypto.publicEncrypt(this.convertDerPublicToPem(cert), Buffer.from(message, 'utf-8')).toString('base64');
    }

    @Post('decrypt')
    public decrypt(@Body('cert') cert, @Body('message') message) {
        console.log(this.convertDerPrivateToPem(cert));
        return crypto.privateDecrypt(this.convertDerPrivateToPem(cert), Buffer.from(message, 'base64')).toString();
    }

    convertDerPublicToPem(der: string) {
        var prefix = '-----BEGIN RSA PUBLIC KEY-----\n';
        var postfix = '-----END RSA PUBLIC KEY-----';
        return prefix + der.match(/.{0,64}/g).join('\n') + postfix;
    }

    convertDerPrivateToPem(der: string) {
        var prefix = '-----BEGIN RSA PRIVATE KEY-----\n';
        var postfix = '-----END RSA PRIVATE KEY-----';
        return prefix + der.match(/.{0,64}/g).join('\n') + postfix;
    }
}
