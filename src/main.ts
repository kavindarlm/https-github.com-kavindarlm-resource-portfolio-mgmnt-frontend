import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import *as cookieParser from 'cookie-parser';
import * as dotenv from 'dotenv';
dotenv.config({ path: './email.env' });

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());

  app.enableCors({
    origin: 'http://localhost:4200',
    credentials: true
  });

  console.log('Server is running on http://localhost:3000');
  await app.listen(3000);
}
bootstrap();
