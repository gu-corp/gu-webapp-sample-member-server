import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import * as expressBearerToken from 'express-bearer-token';

// import { HttpExceptionFilter } from './exception/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Setting up Express middiewares
  app.use(cookieParser());          
  app.use(expressBearerToken());

  // app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(8080);
}
bootstrap();
