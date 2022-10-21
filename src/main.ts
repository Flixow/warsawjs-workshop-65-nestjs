import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import supertokens from 'supertokens-node';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { SupertokensExceptionFilter } from 'src/auth/auth.filter';
import { AppModule } from './app.module';

async function bootstrap() {
  const port = process.env.port || 3000;

  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
  }));

  app.enableCors({
    origin: [process.env.SUPERTOKENS_WEBSITE_DOMAIN],
    allowedHeaders: ['content-type', ...supertokens.getAllCORSHeaders()],
    credentials: true,
  });
  app.useGlobalFilters(new SupertokensExceptionFilter());

  const config = new DocumentBuilder()
    .setTitle('WarsawJS workshop 65')
    .setDescription('The WarsawJS workshop 65 API in NestJS')
    .setVersion('1.0')
    .addTag('NestJS')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);

  console.log(`🚀 Application is running on: http://localhost:${port}`);
}
bootstrap();
