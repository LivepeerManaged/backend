import {ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus} from '@nestjs/common';
import {Request, Response} from 'express';
import {HttpAdapterHost} from "@nestjs/core";
import {BaseError} from "./BaseError";
import {randomUUID} from "crypto";
import {LoggingService} from "./Logger/Services/loggingService";
import {Logger} from "tslog";
import {yellow} from "colors";

@Catch(BaseError)
export class BaseErrorExceptionFilter implements ExceptionFilter {
    private logger = new Logger({
        name: 'ErrorLogger',
        minLevel: 'debug',
        displayFunctionName: false,
        displayFilePath: "hidden"
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

        this.logger.setSettings({requestId: uuid}); //TODO check if there is a better way :<. but its kinda nice :>

        //TODO add info for logged in daemon/user
        this.logger.error(yellow(error.message), parameters);

        const responseBody = {
            id: uuid,
            message: error.message,
        };

        httpAdapter.reply(ctx.getResponse(), responseBody);
    }
}
