import {ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus} from '@nestjs/common';
import {Request, Response} from 'express';
import {HttpAdapterHost} from "@nestjs/core";
import {BaseError} from "./BaseError";
import {randomUUID} from "crypto";
import {LoggingService} from "./Logger/Services/loggingService";
import {Logger} from "tslog";

@Catch(BaseError)
export class BaseErrorExceptionFilter implements ExceptionFilter {
    private logger = new Logger({
        name: 'ErrorLogger',
        minLevel: 'debug',
    });

    constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

    catch(error: BaseError, host: ArgumentsHost): void {
        const { httpAdapter } = this.httpAdapterHost;
        const ctx = host.switchToHttp();
        let uuid = randomUUID();
        const parameters = {};

        Array.from(error.parameter.entries()).forEach((entry) => {
            parameters[entry[0]] = entry[1];
        });

        this.logger.error(error.message, parameters);

        const responseBody = {
            id: uuid,
            error: error.name,
            message: error.message,
            parameters: parameters
        };

        httpAdapter.reply(ctx.getResponse(), responseBody);
    }
}
