// const amqp = require("amqplib");

// const queue = "otpq";

// const recvMsg = async () => {
// 	const connection = await amqp.connect("amqp://localhost");
// 	const channel = connection.createChannel();
// 	await (await channel).assertQueue(queue, { durable: false });
// 	console.log(`Waiting for messages in ${queue}`);
// 	(await channel).consume(
// 		queue,
// 		msg => {
// 			console.log(`Received: ${msg.content.toString()}`);
// 		},
// 		{ noAck: true }
// 	);
// };

// recvMsg();
