import {IsEmail, IsString} from "class-validator";

export class UserLoginDto {
    @IsEmail({},{message:'Невалидный email'})
    email: string;

    @IsString()
    password: string;
}