// main.js
import { create } from 'venom-bot';
import { msgHandler } from './msgHandler.js';
import startTerminal from './terminal.js';

create({
    session: 'druida-bot',
    multidevice: true
})
.then((client) => {
    start(client);
    console.log("Server started!");
    startTerminal(client);
})
.catch((error) => {
    console.error(error);
});

function start(client) {
    client.onMessage((message) => {
        msgHandler(client, message);
    });
}
