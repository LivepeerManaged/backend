import {NestFactory} from '@nestjs/core';
import {AppModule} from './App/AppModule';
import {LoggerBridge} from "./LoggerBridge";
import {BaseErrorExceptionFilter} from "./BaseErrorExceptionFilter";
import {ValidationPipe} from "@nestjs/common";

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        logger: new LoggerBridge(),
    });
    app.useGlobalPipes(new ValidationPipe());
    app.useGlobalFilters(new BaseErrorExceptionFilter(app));
    await app.listen(3000);
}

bootstrap();


