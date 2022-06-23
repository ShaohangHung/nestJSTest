import { Module } from '@nestjs/common';
import { AppController } from './app/app.controller';
import { AppService } from './app/app.service';
import { CatsService } from './cats/cats.service';
import { CatsController } from './cats/cats.controller';
import { RabbitMqController } from './rabbit-mq/rabbit-mq.controller';
import { ProducerService } from './rabbit-mq/producer.service';
import { ConfigModule } from './config/config.module';
import { UploadFileController } from './upload-file/upload-file.controller';
import { UploadFileService } from './upload-file/upload-file.service';

@Module({
  imports: [ConfigModule],
  controllers: [
    AppController,
    CatsController,
    RabbitMqController,
    UploadFileController,
  ],
  providers: [AppService, CatsService, ProducerService, UploadFileService],
})
export class AppModule {}
