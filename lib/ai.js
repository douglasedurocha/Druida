import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const apiKey = process.env.API_KEY;
const apiBase = process.env.API_BASE;

const chatCompletion = async (content) => {
  try {
    const response = await axios.post(
      `${apiBase}/chat/completions`,
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
          'Authorization': `Bearer ${apiKey}`,
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
      `${apiBase}/images/generations`,
      {
        prompt,
        n,
        size,
      },
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
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

const makeRequest = async (func, content, ...args) => {
  try {
    const response = await func(content, ...args);
    return response;
  } catch (error) {
    return error;
  }
};

export { makeRequest, chatCompletion, generateImage };
