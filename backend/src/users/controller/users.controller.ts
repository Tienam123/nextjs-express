import {Request, Response, NextFunction} from 'express'
import {BaseController} from "../../common/controller/base.controller";
import {HttpError} from "../../erorrs/http-error";
import {ILogger} from "../../logger/logger.interface";
import {inject, injectable} from "inversify";
import {TYPES} from "../../types";
import 'reflect-metadata'
import {IUsersController} from "./users.controller.interface";
import {UserLoginDto} from "../dto/user-login.dto";
import {UserRegisterDto} from "../dto/user-register.dto";
import {User} from "../entity/user.entity";
import {UsersService} from "../service/users.service";
import {ValidateMiddleware} from "../../common/middleware/validate.middleware";

@injectable()
export class UsersController extends BaseController implements IUsersController {
    constructor(
        @inject(TYPES.LoggerService) private loggerService: ILogger,
        @inject(TYPES.UsersService) private usersService: UsersService
    ) {
        super(loggerService)
        this.bindRoutes([
            {
                path: '/register',
                method: 'post',
                func: this.register,
                middlewares: [new ValidateMiddleware(UserRegisterDto)]
            },
            {path: '/login', method: 'post', func: this.login},
            {path: '/:id/create', method: 'put', func: this.getUser}
        ])
    }

    login(req: Request<{}, {}, UserLoginDto>, res: Response, next: NextFunction): void {
        console.log(req.body)
        next(new HttpError(401, 'Unauthorized', 'http://localhost:9000/users/login'))
    }

    async register({body}: Request<{}, {}, UserRegisterDto>, res: Response, next: NextFunction) {
        const result = await this.usersService.createUser(body);

        if (!result) {
            return next(new HttpError(422, 'Такой пользователь уже существует'));
        }
        const data = {
            id: result.id,
            email: result.email
        }
        this.created(res,'Пользователь создан',data);
    }

    async getUser(req: Request, res: Response, next: NextFunction) {
        this.ok(res, 'mesage')
    }
}