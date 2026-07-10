import { NestFactory } from '@nestjs/core';
import helmet from 'helmet'
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
 
  app.use(helmet());

  app.enableCors({
  origin: 'http://localhost:3000',
});

 const config = new DocumentBuilder()
  .setTitle('Books API')
  .setDescription('Документация API')
  .setVersion('1.0')
  .addBearerAuth()
  .build();

  app.useGlobalPipes(
  new ValidationPipe({
    transform: true,
    whitelist: true,
  }),
);

app.useGlobalPipes(
  new ValidationPipe({
    transform: true,
  }),
);
  const documentFactory = () =>
    SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(3001);
}


bootstrap();