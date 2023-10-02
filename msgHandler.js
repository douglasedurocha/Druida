import { dice } from './lib/dices.js'

const prefix = '.';

async function sendMessage(client, from, responseMessage){
    responseMessage = '(づ ◕‿◕ )づ 𝓓𝓻𝓾𝓲𝓭𝓪 \n' + responseMessage
    client
        .sendText(from, responseMessage)
        .then((result) => {
            console.log('Result: ', result);
        })
        .catch((erro) => {
            console.error('Error when sending: ', erro);
        });
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

export function msgHandler(client, receivedMessage){
    if(receivedMessage.body[0] == prefix){
        const { command, params } = parseCommand(receivedMessage.body);
        try{
            let responseMessage;
            switch(command){
                // Roll a dice
                case 'd':
                    responseMessage = dice(receivedMessage.from, params)
                // Create a new AI character
                case 'person':
                    responseMessage
                    break
                // Create a new AI place
                case 'place':
                    responseMessage
                    break
                // Show the player's attributes
                case 'att':
                    responseMessage
                    break
                // Show the player's items
                case 'items':
                    responseMessage
                    break
                // Show the player's skills
                case 'skills':
                    responseMessage
                    break
                // Turn on/off AI autopilot
                case 'autopilot':
                    break
                default:
                    responseMessage = command + " command not found"
            }
            sendMessage(client, receivedMessage.from, responseMessage);
        }catch (error){
            console.log(error)
        }
    }
}