import { RabbitMQ } from "./"

const rabbitMQ = new RabbitMQ();

(async () => {
  const channel = await rabbitMQ.connect()
  channel.consume(rabbitMQ.queue, (msg) => {
    if (msg) {
      channel.ack(msg)
    }
  })
})()
