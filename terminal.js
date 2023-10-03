// terminal.js
import { msgHandler, sendMessage } from './msgHandler.js';
import readline from 'readline';
import chalk from 'chalk';
import fs from 'fs'
const config = JSON.parse(fs.readFileSync('./config.json'))

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const players = {
    "poatan": "a",
    "edmund": "b",
    "arthur": "c",
    "mario": "d",
    "diogo": "e"
}

let author = 'adm';

function startTerminal(client) {
    rl.question(chalk.magentaBright('druida@bot> '), async (input) => {
        input = input.trim();
        if (input){
            if(players.hasOwnProperty(input)){
                author = players[input];
            }
            await sendMessage(client, config.groupNumber, input, true);
            await msgHandler(client, { from: config.groupNumber, body: input, author:author });
        }

        startTerminal(client);
    });
}

export default startTerminal;
