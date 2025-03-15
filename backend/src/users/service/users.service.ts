import {Request, Response, NextFunction} from "express";
import {UserLoginDto} from "../dto/user-login.dto";
import {UserRegisterDto} from "../dto/user-register.dto";
import {User} from "../entity/user.entity";
import {UsersServiceInterface} from "./users.service.interface";
import {inject, injectable} from "inversify";
import {TYPES} from "../../types";
import {IConfigService} from "../../config/config.service.interface";
import {TYPES_REPOSITORY} from "../../types/repository";
import {IUserRepository} from "../repository/users.repository.interface";
import {UserModel} from "@prisma/client";


@injectable()
export class UsersService implements UsersServiceInterface {

    constructor(
        @inject(TYPES.ConfigService) private configService: IConfigService,
        @inject(TYPES_REPOSITORY.UserRepository) private userRepository: IUserRepository
    ) {
    }

    async createUser({email, password, name}: UserRegisterDto): Promise<UserModel | null> {
        const newUser = new User(email, name);
        const salt = this.configService.get('SALT')
        await newUser.setPassword(password, Number(salt));
        const existedUser = await this.userRepository.find(email);
        if (existedUser) {
            return null;
        }
        return await this.userRepository.create(newUser);
    };

    register = () => {
        return null;
    }

    validateUser = (dto: UserLoginDto) => {
        return true;
    };

}