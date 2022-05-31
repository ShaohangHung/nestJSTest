import { Module } from '@nestjs/common';
import { AppController } from './app/app.controller';
import { AppService } from './app/app.service';
import { CatsService } from './cats/cats.service';
import { CatsController } from './cats/cats.controller';
import { RabbitMqController } from './rabbit-mq/rabbit-mq.controller';
import { ProducerService } from './rabbit-mq/producer.service';
import { ConfigModule } from './config/config.module';

@Module({
  imports: [ConfigModule],
  controllers: [AppController, CatsController, RabbitMqController],
  providers: [AppService, CatsService, ProducerService],
})
export class AppModule {}
