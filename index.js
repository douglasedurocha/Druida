// main.js
import { create } from 'venom-bot';
import { msgHandler } from './msgHandler.js';

create({
    session: 'druida-bot',
    multidevice: true
})
.then((client) => {
    start(client);
    console.log("Server started!");
})
.catch((error) => {
    console.error(error);
});

function start(client) {
    client.onMessage((message) => {
        msgHandler(client, message);
    });
}
