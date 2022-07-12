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
import { WebhookController } from './webhook/webhook.controller';
import { FacebookService } from './facebook/facebook.service';
import { WhatsappService } from './whatsapp/whatsapp.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule, ConfigModule],
  controllers: [
    AppController,
    CatsController,
    RabbitMqController,
    UploadFileController,
    WebhookController,
  ],
  providers: [
    AppService,
    CatsService,
    ProducerService,
    UploadFileService,
    FacebookService,
    WhatsappService,
  ],
})
export class AppModule {}
