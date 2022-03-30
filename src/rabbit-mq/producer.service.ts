import * as amqp from 'amqplib';

export class ProducerService {
  private connectionUrl: string;
  private channel: any;
  constructor(CONN_URL) {
    this.connectionUrl = CONN_URL;
  }

  async connect() {
    const connection = await amqp.connect(this.connectionUrl);
    this.channel = await connection.createChannel();
  }

  async publishToQueue(queueName, data) {
    await this.channel.assertQueue(queueName, { durable: true });
    this.channel.sendToQueue(queueName, Buffer.from(data), {
      persistent: true,
    });
  }

  async publishToExchangeFanout(exchangeName, exchangeType, data) {
    await this.channel.assertExchange(exchangeName, exchangeType, {
      durable: false,
    });
    this.channel.publish(exchangeName, '', Buffer.from(data));
  }

  async publishToExchangeDirect(
    exchangeName,
    exchangeType,
    exchangeRouteKey,
    data,
  ) {
    await this.channel.assertExchange(exchangeName, exchangeType, {
      durable: false,
    });
    this.channel.publish(exchangeName, exchangeRouteKey, Buffer.from(data));
  }

  closeChannel() {
    this.channel.close();
    console.log(`Closing rabbitmq channel`);
  }
}
