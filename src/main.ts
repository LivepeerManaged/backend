import {HttpAdapterHost, NestFactory} from '@nestjs/core';
import {AppModule} from './App/AppModule';
import * as fs from "fs";
import {LoggerBridge} from "./LoggerBridge";
import {BaseErrorExceptionFilter} from "./BaseErrorExceptionFilter";

async function bootstrap() {
  const app = await NestFactory.create(AppModule,  {
    logger: new LoggerBridge()
  });
  app.useGlobalFilters(new BaseErrorExceptionFilter(app.get(HttpAdapterHost)));
  await app.listen(3000);
}
bootstrap();
