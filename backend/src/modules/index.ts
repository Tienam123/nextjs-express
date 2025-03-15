import {ContainerModule, ContainerModuleLoadOptions} from "inversify";
import {ILogger} from "../logger/logger.interface";
import {TYPES} from "../types";
import {LoggerService} from "../logger/logger.service";
import {IExceptionFilter} from "../erorrs/exception.filter.interface";
import {ExceptionFilter} from "../erorrs/exception.filter";
import {UsersController} from "../users/controller/users.controller";
import {UsersServiceInterface} from "../users/service/users.service.interface";
import {UsersService} from "../users/service/users.service";
import {IConfigService} from "../config/config.service.interface";
import {ConfigService} from "../config/config.service";
import {PrismaService} from "../database/prisma.service";
import {IUserRepository} from "../users/repository/users.repository.interface";
import {UsersRepository} from "../users/repository/users.repository";
import {App} from "../app";
import {TYPES_REPOSITORY} from "../types/repository";

export const appBindings = new ContainerModule((container: ContainerModuleLoadOptions) => {
    container.bind<ILogger>(TYPES.LoggerService).to(LoggerService).inSingletonScope();
    container.bind<IExceptionFilter>(TYPES.ExceptionFilter).to(ExceptionFilter);
    container.bind<UsersController>(TYPES.UsersController).to(UsersController);
    container.bind<UsersServiceInterface>(TYPES.UsersService).to(UsersService);
    container.bind<IConfigService>(TYPES.ConfigService).to(ConfigService).inSingletonScope();
    container.bind<PrismaService>(TYPES.PrismaService).to(PrismaService).inSingletonScope();
    container.bind<App>(TYPES.Application).to(App);
})


export const repositoryBindings = new ContainerModule((container: ContainerModuleLoadOptions) => {
    container.bind<IUserRepository>(TYPES_REPOSITORY.UserRepository).to(UsersRepository);
})
