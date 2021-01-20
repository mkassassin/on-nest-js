import { NestFactory } from '@nestjs/core';

import {
  ValidationPipe,
  ValidationError,
  BadRequestException,
} from '@nestjs/common';
import { useContainer } from 'class-validator';

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { MongoExceptionFilter } from './helpers/mongo-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        const errResponse = validationErrors.map((error) => {
          const constraintsArr = Object.keys(error.constraints);
          const errorMessage = constraintsArr.map(
            (errKey) => error.constraints[errKey],
          );
          const newErr = {
            property: error.property,
            message: errorMessage,
          };
          return newErr;
        });
        return new BadRequestException(errResponse);
      },
    }),
  );
  app.useGlobalFilters(new MongoExceptionFilter());
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  const options = new DocumentBuilder()
    .setTitle('Moyyn-API')
    .setDescription('Follow the Detailed API`s and Keys')
    .setVersion('1.0')
    .addTag('company')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
