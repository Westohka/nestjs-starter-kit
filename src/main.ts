import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';

import * as helmet from 'helmet';

import { AppModule } from './app/app.module';

import AppExceptionsFilter from './app/utils/AppExceptionsFilter';
import AppValidationPipe from './app/utils/AppValidationPipe';

import config from './app/config/config';
import rabbit from './app/config/rabbit';
import swagger from './app/config/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const adapter = app.get(HttpAdapterHost);
  const exceptionFilter = new AppExceptionsFilter(adapter);

  app.useGlobalFilters(exceptionFilter);
  app.enableShutdownHooks();
  app.setGlobalPrefix(config.server.route_prefix);

  const validatorPipe = new AppValidationPipe();
  app.useGlobalPipes(validatorPipe);

  app.connectMicroservice({
    ...rabbit,
  });

  const document = SwaggerModule.createDocument(app, swagger, {
    ignoreGlobalPrefix: true,
  });

  SwaggerModule.setup(
    `${config.server.route_prefix}${config.swagger.prefix}`,
    app,
    document,
  );

  app.enableCors(config.server.cors);
  app.use(helmet());

  await app.startAllMicroservices();
  await app.listen(config.server.port);
}

bootstrap();
