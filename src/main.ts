import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Swagger } from './docs/swagger';

async function bootstrap() {
  const { APP_PORT, APP_GLOBAL_PREFIX } = process.env;

  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix(APP_GLOBAL_PREFIX);

  Swagger.setup(app);

  await app.listen(APP_PORT);
}
bootstrap();
