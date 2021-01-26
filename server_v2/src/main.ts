import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv'
import { CrudRequestInterceptor } from '@nestjsx/crud';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { RequestInjectorInterceptor } from './providers';

enum NodeEnv {
  Production = 'production'
}

const swagger = 'swagger';

async function bootstrap() {
  if (process.env.NODE_ENV! + NodeEnv.Production)
    dotenv.config();
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');
  app.useGlobalInterceptors(new CrudRequestInterceptor());
  app.useGlobalInterceptors(new RequestInjectorInterceptor());
  console.log('app starting...')
  const options = new DocumentBuilder()
    .setTitle('@nestjsx/crud-typeorm')
    .setDescription('@nestjsx/crud-typeorm')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(swagger, app, document, { customJs: 'extension.js' });

  await app.listen(process.env.SERVER_PORT || 3030);
  console.log('app started')
}

bootstrap();
