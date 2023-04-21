import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DefaultExceptionFilter } from './exception-filters/default-exception.filter';
import { join } from 'path';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(express.static(join(__dirname, '..', 'public')));
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  app.useGlobalFilters(new DefaultExceptionFilter());
  app.enableCors();
  await app.listen(5000);
}
bootstrap();
