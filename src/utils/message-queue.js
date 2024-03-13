const ampqlib = require("amqplib");
const { MESSAGE_BROKER_URL, EXCHANGE_NAME } = require("../config/server-config");

const createChannel = async () => {
    try {
        // creating the connection
        const connection = await ampqlib.connect(MESSAGE_BROKER_URL);
        const channel = await connection.createChannel();
        channel.assertExchange(EXCHANGE_NAME, "direct", false);
        return channel;
    } catch (error) {
        throw error;
    }
}

const publishMessage = async (channel, binding_key, message) => {
    try {
        await channel.assertQueue("MOVIE_REMINDER_QUEUE");
        await channel.publish(EXCHANGE_NAME, binding_key, Buffer.from(message));
    } catch (error) {
        throw error
    }
}

const subscribingMessage = async (channel, service, binding_key) => {
    try {
        const applicationQueue = await channel.assertQueue("REMINDER_QUEUE");
        channel.bindQueue(applicationQueue, EXCHANGE_NAME, binding_key);
        channel.consume(applicationQueue.queue, msg => {
            console.log("recieved data");
            console.log(msg.content.toString());
            const payload = JSON.parse(msg.content.toString());
            service(payload);
            channel.ack(msg);
        })
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createChannel,
    publishMessage,
    subscribingMessage
}