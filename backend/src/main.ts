import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerService } from './infrastructure/logger/logger.service';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.APP_PORT ?? 8080
  app.use(cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true,
  }));
  new LoggerService().log('Application start', `App running in port [${port}]`)
  await app.listen(port);
}
bootstrap();
