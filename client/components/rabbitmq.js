import {Connection, Exchange, Queue} from 'react-native-rabbitmq';

// const queueName = 'otpq';
// const exchangeName = 'otpq';

// const rabbitMq = () => {
//   const config = {
//     host: '',
//     port: 5672,
//     username: 'guest',
//     password: 'guest',
//     virtualhost: 'vhost',
//     ttl: 10000, // Message time to live,
//     ssl: true, // Enable ssl connection, make sure the port is 5671 or an other ssl port
//   };

//   let connection = new Connection(config);

//   connection.on('error', event => {
//     console.error('error: ', event);
//   });

//   connection.on('connected', event => {
//     let queue = new Queue(
//       this.connection,
//       {
//         name: queueName,
//         passive: false,
//         durable: true,
//         exclusive: false,
//         consumer_arguments: {'x-priority': 1},
//       },
//       {
//         // queueDeclare args here like x-message-ttl
//       },
//     );

//     let exchange = new Exchange(connection, {
//       name: exchangeName,
//       type: 'direct',
//       durable: true,
//       autoDelete: false,
//       internal: false,
//     });

//     queue.bind(exchange, queueName);

//     queue.on('message', data => {
//       console.log('Recvd data: ', data);
//     });

//     //   queue.on('messages', data => {});
//   });

//   let message = 'test';
//   let routing_key = '';
//   let properties = {
//     expiration: 10000,
//   };
//   exchange.publish(data, routing_key, properties);
// };

// export default rabbitMq;
