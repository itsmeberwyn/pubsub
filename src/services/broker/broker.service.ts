import amqplib from "amqplib";
import amqp, { Connection } from "amqplib/callback_api";

export default class RabbitMQ {
  private amqpConnection: any;
  constructor() {}

  public async createRabbitMQConnection() {
    try {
      this.amqpConnection = await amqplib.connect("amqp://localhost");
      this.createChannel("Channel123");
    } catch (e) {}
  }

  private async createChannel(channel: string) {
    const chan = await this.amqpConnection.createChannel();
    await chan.assertQueue(channel);

    chan.consume(channel, (msg: any) => {
      if (msg !== null) {
        console.log("Received:", msg.content.toString());
        chan.ack(msg);
      } else {
        console.log("Consumer cancelled by server");
      }
    });
  }

  public subcribeChannel() {}

  public unsubscribeChannel() {}
}
