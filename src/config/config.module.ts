import { Global, Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import webhookConfig from './webhook.config';

@Global()
@Module({
  imports: [
    NestConfigModule.forRoot({
      load: [webhookConfig],
      cache: true,
      isGlobal: true,
    }), // Config module
  ],
})
export class ConfigModule {}
