// Supports ES6
import { create, Whatsapp } from 'venom-bot';
import { msgHandler } from './msgHandler.js';

create({
    session: 'druida-bot',
    multidevice: true
})
.then((client) => {
    start(client);
    console.log("Server started!")
})
.catch((erro) => {
    console.log(erro);
});

function start(client) {
    client.onMessage((message) => {
        msgHandler(client, message)
    });
}

