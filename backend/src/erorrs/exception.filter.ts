import {Request, Response, NextFunction} from "express";
import {LoggerService} from "../logger/logger.service";
import {IExceptionFilter} from "./exception.filter.interface";
import {HttpError} from "./http-error";
import {inject, injectable} from "inversify";
import {ILogger} from "../logger/logger.interface";
import {TYPES} from "../types";
@injectable()
export class ExceptionFilter implements IExceptionFilter {

    constructor(@inject(TYPES.LoggerService) private logger: ILogger) {
        this.logger = logger
    }

    catch(err: Error | HttpError, req: Request, res: Response, next: NextFunction) {
        if (err instanceof HttpError) {
            this.logger.error(`[${err.context}] Ошибка ${err.statusCode} : ${err.message}`);
            res.status(err.statusCode).send({err: err.message})
        } else {
            this.logger.error(`${err.message}`);
            res.status(500).send(err.message);
        }
    }
}