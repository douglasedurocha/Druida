// Supports ES6
import { create, Whatsapp } from 'venom-bot';

create({
    session: 'druida-bot',
    multidevice: true
  })
  .then((client) => {
    start(client)
    console.log("Server started!")
  })
  .catch((erro) => {
    console.log(erro);
});

function start(client) {
  client.onMessage((message) => {
    if (message.body === 'd20') {
      let randomNumber = Math.floor(Math.random() * 20) + 1;
      client
        .sendText(message.from, randomNumber.toString())
        .then((result) => {
          console.log('Result: ', result); //return object success
        })
        .catch((erro) => {
          console.error('Error when sending: ', erro); //return object error
        });
    }
  });
}
