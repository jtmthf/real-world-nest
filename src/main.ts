import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { bootstrap } from './bootstrap';

async function main() {
  const app = await bootstrap(() => NestFactory.create(AppModule));

  await app.listen(3000);
}
main();
