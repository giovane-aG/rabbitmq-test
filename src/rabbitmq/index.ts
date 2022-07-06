import { connect, Connection, Channel, Message } from 'amqplib'


import { RABBITMQ_URL } from './config'

export class RabbitMQ {

  public queue = 'teste'

  async connect() {
    const connection = await connect(RABBITMQ_URL)
    const channel = await connection.createChannel()

    return channel
  }

  async sendToQueue(channel: Channel, packet: number) {
    channel.assertQueue(this.queue)
  }

  async consumeQueue(channel: Channel) {
    channel.consume(this.queue, msg => {
      if (msg) {
        channel.ack(msg)
      }
      else {
        console.log('Consumer cancelled by server')
      }
    })
  }

}
