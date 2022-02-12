import {IsEmail, IsNotEmpty, Matches} from 'class-validator';

export class LoginUserDto {
    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;
}