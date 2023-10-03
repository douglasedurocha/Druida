import { dice } from './lib/dices.js'
import { info } from './lib/token.js'
import startTerminal from './terminal.js';

const prefix = '.';

async function sendMessage(client, from, responseMessage, isTerminalMsg=false){
    if(!isTerminalMsg){
        responseMessage = '(づ ◕‿◕ )づ 𝓓𝓻𝓾𝓲𝓭𝓪 \n' + responseMessage
    }
    await client
        .sendText(from, responseMessage)
        .then((result) => {
            let response = isTerminalMsg ? "Sent via terminal: \n" : "\nSent by Druida: \n"
            response += result.text;
            console.log(response);
        })
        .catch((erro) => {
            console.error('Error when sending: ', erro);
        });

    startTerminal(client);
}

function cleanString(input){
    input = input.substring(1);
    input = input.toLowerCase();
    return input
}

function parseCommand(input) {
    // Clean the string
    input = cleanString(input);

    const parts = input.trim().split(' ');
    let command = parts[0];
    let params = parts.slice(1);

    // Handles dices commands like d20, d6, d100
    const match = command.match(/^d(\d+)$/);

    if (match) {
        command = 'd';
        params = [parseInt(match[1])];
    }

    return { command, params };
}

async function msgHandler(client, receivedMessage){
    if(receivedMessage.body[0] == prefix){
        console.log("\nCommand received: \n", receivedMessage.body)
        const { command, params } = parseCommand(receivedMessage.body);
        try{
            let responseMessage;
            switch(command){
                // Roll a dice
                case 'd':
                    responseMessage = dice(receivedMessage.author, params)
                    break
                // Person the player's attributes
                case 'info':
                    responseMessage = info(receivedMessage.author, params) 
                    break
                // Create a new AI character
                case 'person':
                    responseMessage
                    break
                // Create a new AI place
                case 'place':
                    responseMessage
                    break
                // Turn on/off AI autopilot
                case 'autopilot':
                    break
                default:
                    responseMessage = command + " command not found"
            }
            await sendMessage(client, receivedMessage.from, responseMessage);
        }catch (error){
            console.log(error)
        }
    }
}

export {msgHandler, sendMessage}