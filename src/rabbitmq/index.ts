import { connect, Connection, Channel, Message } from 'amqplib'


import { RABBITMQ_URL } from './config'

export class RabbitMQ {

  async connect() {
    const connection = await connect(RABBITMQ_URL)
    const channel1 = await connection.createChannel()
    const channel2 = await connection.createChannel()

    return { connection, channel1, channel2 }
  }

  async sendToQueue(channel: Channel, packet: number) {
    channel.assertQueue(queue)

    setInterval(() => {
      channel.sendToQueue(queue, Buffer.from(packet.toString()))
    }, 3000)
  }

  async consumeQueue(channel: Channel) {
    channel.consume(queue, msg => {
      if (msg) {
        console.log(msg.content.toString())
        channel.ack(msg)
      }
      else {
        console.log('Consumer cancelled by server')
      }
    })
  }

}

const queue: string = 'teste'
const rabbitMQ = new RabbitMQ();

(async () => {
  const { channel1, channel2, connection } = await rabbitMQ.connect()

  await rabbitMQ.consumeQueue(channel1)

  // for (let i = 0; i < 100; i++) {
  //   console.log(i)
  //   await rabbitMQ.sendToQueue(channel2, i)
  // }
})()


