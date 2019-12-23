import { INestApplication, ValidationPipe } from '@nestjs/common';
import {
  initializeTransactionalContext,
  patchTypeORMRepositoryWithBaseRepository,
} from 'typeorm-transactional-cls-hooked';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export async function bootstrap(
  appFactory: () => Promise<INestApplication> | INestApplication,
) {
  initializeTransactionalContext();
  patchTypeORMRepositoryWithBaseRepository();

  const app = await appFactory();

  app.setGlobalPrefix('/api');

  app.useGlobalPipes(new ValidationPipe());

  const options = new DocumentBuilder()
    .setTitle('Real World')
    .setDescription('Real World API implementation with NestJS')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);

  return app;
}
