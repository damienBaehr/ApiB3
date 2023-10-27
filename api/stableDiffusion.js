const fs = require("fs");
const dontenv = require("dotenv");
dontenv.config({ path: ".env.local" });
const apiKey = process.env.CLIPDROP_API_KEY;

async function generateImage(imageName, prompt) {
    return new Promise(async (resolve, reject) => {
      let stableDiffusionUrl = "https://clipdrop-api.co/text-to-image/v1";
  
      let formData = new FormData();
      formData.append("prompt", prompt);
  
      try {
        const requestOptions = {
          method: "POST",
          headers: {
            "x-api-key": apiKey,
          },
          body: formData,
          redirect: "follow",
        };
  
        const response = await fetch(stableDiffusionUrl, requestOptions);
        const buffer = await response.arrayBuffer();
  
        const outputName = imageName + ".png";
        const imagePath = "./images/" + outputName;
        fs.writeFile(imagePath, Buffer.from(buffer), (error) => {
          if (error) {
            console.error("Erreur lors de la sauvegarde de l'image :", error);
            reject(error);
          } else {
            console.log("Image sauvegardée dans", imagePath);
            resolve(imagePath);
          }
        });
      } catch (error) {
        console.error("Une erreur s'est produite :", error);
        reject(error);
      }
    });
  }

module.exports = { generateImage };
