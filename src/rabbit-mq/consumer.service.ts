import * as amqp from 'amqplib';

const queueName = `email-service`;
const connectionUrl = `amqp://localhost:5672`;

const connect = async () => {
  try {
    const connection = await amqp.connect(connectionUrl);
    const channel = await connection.createChannel();

    /*
    await channel.assertQueue(queueName);
    channel.prefetch(2);
    channel.consume(
      queueName,
      async (message) => {
        const secs = message.content.toString().split('.').length - 1;
        console.log('Recieved job message: ', message.content.toString());
        await sleep(secs * 1000);
        console.log(`job message: ${message.content.toString()} Done! `);
        channel.ack(message);
      },
      { noAck: false },
    );
    */

    // fanout
    const exchangeName = `logs`;
    await channel.assertExchange(exchangeName, 'fanout', {
      durable: false,
    });
    const q = await channel.assertQueue('', {
      exclusive: true,
    });
    channel.bindQueue(q.queue, exchangeName, '');
    channel.consume(
      q.queue,
      async (message) => {
        const secs = message.content.toString().split('.').length - 1;
        console.log('Recieved job message: ', message.content.toString());
        await sleep(secs * 1000);
        console.log(`job message: ${message.content.toString()} Done! `);
        channel.ack(message);
      },
      { noAck: false },
    );
    console.log(` [*] Waiting for messages in ${q.queue}, type:fanout`);

    // direct
    const exchangeNameDirect = `direct_logs`;
    await channel.assertExchange(exchangeNameDirect, 'direct', {
      durable: false,
    });
    const q2 = await channel.assertQueue('', {
      exclusive: true,
    });
    channel.bindQueue(q2.queue, exchangeNameDirect, 'error');
    // channel.bindQueue(q2.queue, exchangeNameDirect, 'info');
    // channel.bindQueue(q2.queue, exchangeNameDirect, 'warning');
    // channel.bindQueue(q2.queue, exchangeNameDirect, 'error');
    channel.consume(
      q2.queue,
      async (message) => {
        const secs = message.content.toString().split('.').length - 1;
        console.log('Recieved job message: ', message.content.toString());
        await sleep(secs * 1000);
        console.log(`job message: ${message.content.toString()} Done! `);
        channel.ack(message);
      },
      { noAck: false },
    );
    console.log(` [*] Waiting for messages in ${q.queue}, type:direct`);

    while (1) {
      // console.log('I am waiting for jobs to do....');
      await sleep(30000);
    }
  } catch (err) {
    console.log(err);
  }
};

const sleep = async (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

connect();
