import { LoggerService } from '@nestjs/common';
import {Logger} from "tslog";
import {yellow} from "colors";
import configuration from "../config/configuration";

export class LoggerBridge implements LoggerService {
    private logger: Logger;
    constructor() {
        this.logger = new Logger({
            displayFunctionName: false,
            displayFilePath: 'hidden',
            displayLoggerName: false,
            // @ts-ignore
            minLevel: configuration().logging.level // TODO Change this because you should not call configuration() directly since its dynamic and can change
        });
    }

    /**
     * Write a 'log' level log.
     */
    log(message: any, ...optionalParams: any[]) {
        this.logger.info(this.transformParams(...optionalParams), message)
    }

    /**
     * Write an 'error' level log.
     */
    error(message: any, ...optionalParams: any[]) {
        this.logger.error(this.transformParams(...optionalParams), message)
    }

    /**
     * Write a 'warn' level log.
     */
    warn(message: any, ...optionalParams: any[]) {
        this.logger.warn(this.transformParams(...optionalParams), message)
    }

    /**
     * Write a 'debug' level log.
     */
    debug?(message: any, ...optionalParams: any[]) {
        this.logger.debug(this.transformParams(...optionalParams), message)
    }

    /**
     * Write a 'verbose' level log.
     */
    verbose?(message: any, ...optionalParams: any[]) {
        this.logger.trace(this.transformParams(...optionalParams), message)
    }

    private transformParams(...optionalParams: any[]): string {
        return `[${yellow(optionalParams.join(', '))}]`;
    };
}