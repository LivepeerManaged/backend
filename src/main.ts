import {HttpAdapterHost, NestFactory} from '@nestjs/core';
import {AppModule} from './App/AppModule';
import * as fs from "fs";
import {LoggerBridge} from "./LoggerBridge";
import {BaseErrorExceptionFilter} from "./BaseErrorExceptionFilter";

async function bootstrap() {
  const app = await NestFactory.create(AppModule,  {
    httpsOptions: {
      key: fs.readFileSync('certs/server_key.pem'),
      cert: fs.readFileSync('certs/server_cert.pem'),
      ca: fs.readFileSync('certs/server_cert.pem'),
      requestCert: true,
      rejectUnauthorized: false
    },
    logger: new LoggerBridge()
  });
  app.useGlobalFilters(new BaseErrorExceptionFilter(app.get(HttpAdapterHost)));
  await app.listen(3000);
}
bootstrap();
