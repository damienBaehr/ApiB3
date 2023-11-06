const OpenAI = require("openai");
const conn = require("../services/db");
const dotenv = require("dotenv");

dotenv.config({ path: ".env.local" });

const openai = new OpenAI({
  apiKey: process.env.OPEN_API_KEY,
});

async function generateAnswer(id) {
    return new Promise(async (resolve, reject) => {
      try {
        const sql = "SELECT text FROM message WHERE id_discussion = ?";
        const values = [id];
        conn.query(sql, values, async (err, results) => {
          if (err) {
            reject(err);
            return;
          }
          const rows = results;
          if (rows.length <= 0) {
            reject({ message: "Aucun message trouvé pour cet id_discussion" });
            return;
          }
          const messagesToSend = [];
          rows.forEach((row) => {
            let i = 0;
            const prefix = "";
            if (i === 0) prefix === "MESSAGE A METTRE AU DEBUT POUR QU'IL COMPRENNE LE TON DU PERSONNAGE";
            const statusMessage = i++%2 == 0 ? "user" : "assistant";
            const text = prefix + row.text
            const message = {
                role: statusMessage,
                content: text,
            }
            messagesToSend.push(message);
          });
          const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: messagesToSend,
            temperature: 0.9,
            max_tokens: 256,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
          });
          resolve(response);
        });
      } catch (error) {
        reject(error);
      }
    });
  }
  

async function generateDescription(prompt) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await openai.completions.create({
        model: "gpt-3.5-turbo-instruct",
        prompt: prompt,
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

module.exports = { generateDescription, generateAnswer };
