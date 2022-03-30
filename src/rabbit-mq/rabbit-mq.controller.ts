import { Body, Controller, Header, HttpCode, Post } from '@nestjs/common';
import { ProducerService } from './producer.service';

const connectionUrl = `amqp://localhost:5672`;

@Controller('rabbit-mq')
export class RabbitMqController {
  constructor(private readonly producerService: ProducerService) {}

  @Post(`sendmailrequest`)
  @HttpCode(200)
  @Header('Cache-Control', 'application/json')
  async sendmailrequest(@Body() body: any): Promise<any> {
    const { exchangeName, exchangeType, exchangeRouteKey, queueName, email } =
      body;
    const messageQueue = new ProducerService(connectionUrl);
    await messageQueue.connect();
    // messageQueue.publishToQueue(queueName, email);
    // messageQueue.publishToExchangeFanout(exchangeName, exchangeType, email);
    messageQueue.publishToExchangeDirect(
      exchangeName,
      exchangeType,
      exchangeRouteKey,
      email,
    );

    return { message: 'sendmailrequest finished' };
  }
}
