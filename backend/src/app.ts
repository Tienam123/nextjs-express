import express, {Express} from "express";
import {Server} from "http";
import cors from 'cors';
import {UsersController} from "./users/users.controller";
import {ExceptionFilter} from "./erorrs/exception.filter";
import {ILogger} from "./logger/logger.interface";
import {inject, injectable} from "inversify";
import {TYPES} from "./types";
import 'reflect-metadata'
import {PrismaService} from "./database/prisma.service";


@injectable()
export class App {
    app: Express;
    port: number;
    private server: Server;

    constructor(
        @inject(TYPES.LoggerService) private logger: ILogger,
        @inject(TYPES.UsersController) private usersController: UsersController,
        @inject(TYPES.ExceptionFilter) private readonly exceptionFilter: ExceptionFilter,
        @inject(TYPES.PrismaService) private prismaService: PrismaService
    ) {
        this.app = express();
        this.port = 9000;

    }

    useMiddleware(): void {
        this.app.use(cors())
        this.app.use(express.urlencoded({extended: true}))
        this.app.use(express.json())
    };

    useRoutes(): void {
        this.app.use('/users', this.usersController.router);
    }

    useExceptionFilters(): void {
        this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter))
    }

    public async init(): Promise<void> {
        this.useMiddleware();
        this.useRoutes();
        this.useExceptionFilters()
        await this.prismaService.connect()
        this.server = this.app.listen(this.port);
        this.logger.log(`🚀 Сервер запущен на http://localhost:${this.port}`)

        this.server.on('error', (err) => {
            console.error('Ошибка запуска сервера:', err);
        });
    }
}
