import {IsNotEmpty} from "class-validator";

export class ActivateDaemonDto {
    @IsNotEmpty()
    publicKey: string;

    @IsNotEmpty()
    daemonSecret: string;

    @IsNotEmpty()
    signature: string;
}