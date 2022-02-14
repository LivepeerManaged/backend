import {IsNotEmpty} from "class-validator";

export class DaemonLoginDto {
    @IsNotEmpty()
    id: string;

    @IsNotEmpty()
    secret: string;

/*
    @IsNotEmpty()
    signature: string;
 */
}