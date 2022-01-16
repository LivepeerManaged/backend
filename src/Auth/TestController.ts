import {Controller, Get, Post, Query} from '@nestjs/common';
import {AuthService} from "./services/AuthService";
import * as crypto from "crypto";

@Controller()
export class TestController {
    constructor(private authService: AuthService) {
    }

    @Get('test')
    public testa() {
        return this.authService.signJwt('0x00')
    }
    @Post('authtest')
    public authtest(@Query('publicKey') publicKey, @Query('cipher') cipher) {
        return this.authService.decryptCipher(publicKey, cipher)
    }
}
