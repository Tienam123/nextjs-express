import {Router, Response} from "express";
import {ExpressReturnType, IControllerRoute} from "../route/route.interface";
import {ILogger} from "../../logger/logger.interface";
import {inject, injectable} from "inversify";
import {TYPES} from "../../types";
import 'reflect-metadata'


export {Router} from 'express'

@injectable()
export abstract class BaseController {
    private readonly _router: Router

    constructor(@inject(TYPES.LoggerService) private logger: ILogger) {
        this._router = Router();
    }


    get router(): Router {
        return this._router;
    }

    public send<T>(res: Response, code: number, message: T): ExpressReturnType {
        res.type('application/json');
        return res.status(code).json(message);
    }

    public ok<T>(res: Response, message: T): ExpressReturnType {
        return this.send<T>(res, 200, message)
    }

    public created<T>(res: Response,message:string,data:T): ExpressReturnType {
        const response = {
            code:201,
            message,
            data
        }
        return this.send<typeof response>(res,201,response);
    }

    protected bindRoutes(routes: IControllerRoute[]): void {
        for (const route of routes) {
            this.logger.log(`[${route.method}] ${route.path}`);
            const middleware = route.middlewares?.map(m => m.execute.bind(m))
            const handler = route.func.bind(this);
            const pipeline = middleware ? [...middleware, handler] : handler;
            this.router[route.method](route.path, pipeline);
        }
    }
}