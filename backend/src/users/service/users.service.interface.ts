import {Request, Response, NextFunction} from 'express'
import {UserRegisterDto} from "../dto/user-register.dto";
import {User} from "../entity/user.entity";
import {UserLoginDto} from "../dto/user-login.dto";
import {UserModel} from "@prisma/client";

export interface UsersServiceInterface {
    createUser: (dto: UserRegisterDto) => Promise<UserModel | null>;
    register: (req: Request, res: Response, next: NextFunction) => void;
    validateUser: (dto:UserLoginDto) => boolean;
}