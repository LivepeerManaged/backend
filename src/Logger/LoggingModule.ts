import {DynamicModule, Module} from '@nestjs/common';
import {LoggingService} from "./Services/loggingService";
import {ISettingsParam} from "tslog";
import {ConfigModule} from "@nestjs/config";

/*
@Module({
  providers: [LoggingService],
  exports: [LoggingService],
})
export class LoggerModule implements Module {}
 */
@Module({})
export class LoggingModule {
    static register(options: ISettingsParam): DynamicModule {
        return {
            module: LoggingModule,
            imports: [
                ConfigModule
            ],
            providers: [
                {
                    provide: 'LOGGER_CONFIG',
                    useValue: options
                },
                LoggingService
            ],
            exports: [LoggingService],
        };
    }
}