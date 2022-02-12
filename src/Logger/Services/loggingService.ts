import {ConsoleLogger, Inject, Injectable, Scope} from "@nestjs/common";
import {ISettingsParam, Logger, TLogLevelName} from "tslog";
import {ILogObject} from "tslog/src/interfaces";
import {ConfigService} from "@nestjs/config";

@Injectable({ scope: Scope.TRANSIENT })
export class LoggingService {
    private logger: Logger;

    constructor(@Inject('LOGGER_CONFIG') private loggerSettings: ISettingsParam, private configService: ConfigService) {
        console.log();
        console.log(configService.get<string>('logging.maxLevel'));
        this.logger = new Logger({
            minLevel: configService.get<TLogLevelName>('logging.level'),
            displayFunctionName: false,
            displayFilePath: "hidden",
            ...loggerSettings
        });
    }

    public setSettings(loggerSettings: ISettingsParam) {
        this.logger.setSettings(loggerSettings);
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