import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { setupSwagger } from './swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  setupSwagger(app);
  const configService = app.get(ConfigService);
  const appEnv = configService.get('APP_ENV');
  console.log(`appEnv=${appEnv}`);
  await app.listen(3000);
}

bootstrap();
