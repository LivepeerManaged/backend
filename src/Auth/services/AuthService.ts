import {Injectable} from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";
import {ConfigService} from "@nestjs/config";
import {KeyObject, publicDecrypt} from "crypto";
import {writeFileSync} from "fs";
const crypto = require("crypto");

@Injectable()
export class AuthService {

    constructor(private configService: ConfigService, private readonly jwtService: JwtService) {
    }

    decryptCipher(publicKey: string, cipher: string) {
        publicKey = Buffer.from(publicKey, 'base64').toString();
        console.log(publicKey);
        /*

                const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
                    // The standard secure default length for RSA keys is 2048 bits
                    modulusLength: 2048,
                });
                publicKey.export()

         */
        //console.log(crypto.publicEncrypt(publicKey));
        console.log(crypto.publicDecrypt(
            {
                key: publicKey,
                asymmetricKeySize: 2048,
                padding: crypto.constants.RSA_PKCS1_PADDING,
                //oaepHash: "sha256",

            },
            // We convert the data string to a buffer using `Buffer.from`
            Buffer.from(cipher, 'base64')
        ).toString("base64"));
    }

    signJwt(publicKey: string) {
        return this.jwtService.sign({
            publicKey: publicKey,
            loggedInSince: Date.now()
//            refreshToken: this.signRefreshToken(user)
        }, {
            expiresIn: '60m',
            secret: this.configService.get<string>('jwtSecret')
        })
    }




}
