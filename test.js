import { makeRequest, generateImage, chatCompletion } from './ai.js';

const content = 'Whats your name?';
const image = 'rabbit';
const n = 1;
const size = '1024x1024';

try {
    //const response = await makeRequest(chatCompletion, content);
    const response = await makeRequest(generateImage, image, n, size);
    console.log(response)
} catch (error) {
    console.error(error);
}