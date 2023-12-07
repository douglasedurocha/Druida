import axios from 'axios';
import fs from 'fs'
const config = JSON.parse(fs.readFileSync('./config.json'))


const chatCompletion = async (content) => {
  try {
    const response = await axios.post(
      `${config.apiBase}/chat/completions`,
      {
        stream: false,
        model: "gpt-4",
        messages: [
          {
            role: "user",
            content: content,
          },
        ],
      },
      {
        headers: {
          'Authorization': `Bearer ${config.apiKey}`,
        },
      }
    );

    const message = response.data.choices[0].message.content;
    return message;
  } catch (error) {
    throw error;
  }
};

const generateImage = async (prompt, n, size) => {
  try {
    const response = await axios.post(
      `${config.apiBase}/images/generations`,
      {
        prompt,
        n,
        size,
      },
      {
        headers: {
          'Authorization': `Bearer ${config.apiKey}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data.data[0].url;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export { chatCompletion, generateImage };
