import {Request, Response, NextFunction} from "express";
import {UserLoginDto} from "./dto/user-login.dto";
import {UserRegisterDto} from "./dto/user-register.dto";
import {User} from "./user.entity";
import {UsersServiceInterface} from "./users.service.interface";
import {injectable} from "inversify";


@injectable()
export class UsersService implements UsersServiceInterface {
   async createUser({email,password,name}: UserRegisterDto):Promise<User | null> {
       const newUser = new User(email, name);
       await newUser.setPassword(password);
       if (!newUser) {
           return null;
       }
       return newUser;
    };

    register = () => {
        return null;
    }

    validateUser = (dto: UserLoginDto) => {
        return true;
    };

}