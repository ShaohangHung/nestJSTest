import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
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
import { LoggerMiddleware } from './middlewares/logger.middleware';

class MessageBox {
  message: string;
  constructor(message: string) {
    this.message = message;
  }
}
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
    {
      provide: `HandsomeMan`,
      useValue: { hello: `world` },
    },
    {
      provide: 'MESSAGE_BOX',
      useFactory: (appService: AppService) => {
        const message = appService.getHello();
        return new MessageBox(message);
      },

      inject: [AppService],
    },
    {
      provide: 'SAME_AS_MESSAGE_BOX',
      useExisting: 'MESSAGE_BOX',
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
