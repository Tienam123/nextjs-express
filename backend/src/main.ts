import {App} from "./app";
import {LoggerService} from "./logger/logger.service";
import {UsersController} from "./users/users.controller";
import {ExceptionFilter} from "./erorrs/exception.filter";
import {Container, ContainerModule, ContainerModuleLoadOptions} from "inversify";
import {ILogger} from "./logger/logger.interface";
import {TYPES} from "./types";
import {IExceptionFilter} from "./erorrs/exception.filter.interface";
import {UsersService} from "./users/users.service";
import {UsersServiceInterface} from "./users/users.service.interface";
import {PrismaService} from "./database/prisma.service";

export interface Bootstrap {
    appContainer: Container;
    app: App
}

export const appBindings = new ContainerModule((container: ContainerModuleLoadOptions) => {
    container.bind<ILogger>(TYPES.LoggerService).to(LoggerService);
    container.bind<IExceptionFilter>(TYPES.ExceptionFilter).to(ExceptionFilter);
    container.bind<UsersController>(TYPES.UsersController).to(UsersController);
    container.bind<UsersServiceInterface>(TYPES.UsersService).to(UsersService);
    container.bind<PrismaService>(TYPES.PrismaService).to(PrismaService);
    container.bind<App>(TYPES.Application).to(App);
})

function bootstrap(): Bootstrap {
    const appContainer = new Container();
    appContainer.load(appBindings);
    const app = appContainer.get<App>(TYPES.Application);
    app.init();
    return {appContainer, app}
}


export const {app, appContainer} = bootstrap();
