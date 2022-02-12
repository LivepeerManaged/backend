import {ArgumentsHost, Catch, ExceptionFilter, HttpStatus, INestApplication} from '@nestjs/common';
import {HttpAdapterHost} from "@nestjs/core";
import {BaseError} from "./BaseError";
import {randomUUID} from "crypto";
import {LoggingService} from "./Logger/Services/loggingService";
import {yellow} from "colors";

@Catch(BaseError)
export class BaseErrorExceptionFilter implements ExceptionFilter {
    constructor(private readonly nestApplication: INestApplication) {}

    async catch(error: BaseError, host: ArgumentsHost): Promise<void> {
        const {httpAdapter} = this.nestApplication.get(HttpAdapterHost);
        const loggingService = await this.nestApplication.resolve(LoggingService);

        const ctx = host.switchToHttp();
        let uuid = randomUUID();
        const parameters = {};

        Array.from(error.parameter.entries()).forEach((entry) => {
            parameters[entry[0]] = entry[1];
        });

        loggingService.setSettings({
            name: 'ErrorLogger',
            displayFunctionName: false,
            displayFilePath: "hidden",
            requestId: uuid
        }) //TODO check if there is a better way :<

        //TODO add info for logged in daemon/user
        loggingService.error(`${yellow(`[${error.name}]`)} ${error.message}`, parameters);

        const responseBody = {
            id: uuid,
            name: error.name,
            message: error.message,
        };
        httpAdapter.reply(ctx.getResponse(), responseBody, HttpStatus.BAD_REQUEST);
    }
}
