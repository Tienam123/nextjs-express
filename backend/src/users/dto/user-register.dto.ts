import {IsEmail, IsString} from "class-validator";

export class UserRegisterDto {
    @IsEmail({}, {message: 'Неверно указан email'})
    email: string;

    @IsString({message:'Не указан пароль'})
    password: string;

    @IsString({message:'Неверный формат имени'})
    name: string;
}