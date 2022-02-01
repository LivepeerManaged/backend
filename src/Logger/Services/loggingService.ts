import {ConsoleLogger, Inject, Injectable, Scope} from "@nestjs/common";
import {ISettingsParam, Logger} from "tslog";
import {ILogObject} from "tslog/src/interfaces";

@Injectable({ scope: Scope.TRANSIENT })
export class LoggingService {
    private logger: Logger;

    constructor(@Inject('LOGGER_CONFIG') private loggerConfig: ISettingsParam) {
        this.logger = new Logger(loggerConfig);
    }

    public silly(...args: unknown[]): ILogObject {
        return this.logger.silly(...args);
    }

    public trace(...args: unknown[]): ILogObject {
        return this.logger.trace(...args);
    }

    public debug(...args: unknown[]): ILogObject {
        return this.logger.debug(...args);
    }

    public info(...args: unknown[]): ILogObject {
        return this.logger.info(...args);
    }

    public warn(...args: unknown[]): ILogObject {
        return this.logger.warn(...args);
    }

    public error(...args: unknown[]): ILogObject {
        return this.logger.error(...args);
    }

    public fatal(...args: unknown[]): ILogObject {
        return this.logger.fatal(...args);
    }
}