import {IMiddleware} from "./middleware.interface";
import {NextFunction, Request, Response} from "express";
import {ClassConstructor, plainToClass, plainToInstance} from "class-transformer";
import {validate} from "class-validator";

export class ValidateMiddleware implements IMiddleware{
    constructor(
        private classToValidate:ClassConstructor<object>
    ) {
    }
    execute(req:Request,res:Response,next:NextFunction) {
        const instance = plainToInstance(this.classToValidate,req.body);
        validate(instance).then((errors) => {
            if (errors.length > 0) {
                res.status(422).send(errors);
            } else {
                next();
            }
        })
    }
}