const OpenAI = require("openai");
const dotenv = require("dotenv");

dotenv.config({ path: ".env.local" });

const openai = new OpenAI({
  apiKey: process.env.OPEN_API_KEY,
});

async function generateDescription(prompt) {
    return new Promise(async (resolve, reject) => {
    
    try {
        const response = await openai.completions.create({
        model: "gpt-3.5-turbo-instruct",
        prompt : prompt,
        temperature: 1,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        });
        
        resolve(response);

    } catch (error) {
        reject(error);
    }
    });
}

module.exports = { generateDescription };