import {IsEmail, IsNotEmpty, Matches} from 'class-validator';

export class CreateUserDto {
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/gm, {message: 'Password is not secure enough!'})
    password: string;
}