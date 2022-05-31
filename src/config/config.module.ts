import { Global, Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';

@Global()
@Module({
  imports: [
    NestConfigModule.forRoot({
      load: [],
      cache: true,
      isGlobal: true,
    }), // Config module
  ],
})
export class ConfigModule {}
