import { RabbitMQ } from "./"

const rabbitMQ = new RabbitMQ();


const run = async () => {
  const channel = await rabbitMQ.connect()
  
  for (let i = 0; i < 1000; i++) {    
    channel.sendToQueue("teste", Buffer.from(i.toString()))
  }
}

run()