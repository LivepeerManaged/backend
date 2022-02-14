import {IsNotEmpty} from "class-validator";

export class DaemonLoginDto {
    @IsNotEmpty()
    publicKey: string;

    @IsNotEmpty()
    secret: string;

    @IsNotEmpty()
    signature: string;
}