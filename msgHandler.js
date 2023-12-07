import { dice } from './lib/dices.js'
import { info, inventory, status } from './lib/token.js'

const prefix = '.';

async function sendMessage(client, from, responseMessage){
    responseMessage = '(づ ◕‿◕ )づ 𝓓𝓻𝓾𝓲𝓭𝓪 \n' + responseMessage
    await client
        .sendText(from, responseMessage)
        .then((result) => {
            console.log(response);
        })
        .catch((erro) => {
            console.error('Error when sending: ', erro);
        });
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
        try {
            let responseMessage;
            switch(command){
                // Roll a dice
                case 'd':
                    responseMessage = dice(receivedMessage.author, params)
                    break
                // Person the player's attributes
                case 'info':
                    responseMessage = await info(receivedMessage.author, ...params) 
                    break
                case 'inventory':
                    responseMessage = await inventory(receivedMessage.author, ...params) 
                    break
                case 'status':
                    responseMessage = await status(receivedMessage.author, ...params) 
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
        } catch (error) {
            console.log(error)
        }
    }
}

export {msgHandler, sendMessage}