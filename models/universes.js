const {generateDescription}= require('../api/openai');
const {generateImage} = require('../api/stableDiffusion');

class Universe {
    constructor(name) {
      this.id = null;
      this.name = name;
      this.description = null;
      this.imgPathUrl = null;
      this.id_user = null;
    }

    toMap(){
        return {
            id: this.id,
            name: this.name,
            description: this.description,
            imgPathUrl: this.imgPathUrl,
            id_user: this.id_user
        }
    }

    static fromMap(map){
      let universe = new Universe(map.name);
      universe.id = map.id;
      universe.description = map.description;
      universe.imgPathUrl = map.imgPathUrl;
      universe.id_user = map.id_user;

      return universe;
    }

    async generateDescription(){
      const prompt = `Génère moi une description pour l'univers de  "${this.name}". Par exemple, raconte moi son histoire, ou un résumé de ce que c'est. Il ne faut pas que ça fasse plus de 150 mots.`;
      let response = await generateDescription(prompt);

      console.log("Test response", response);
      this.description = response.choices[0].text;
    }

    async generateImage(){
      let prompt = "Génère moi une image pour l'univers : " + this.name + ".";
      const imageName = "universe_" + this.name + "_image";
      
      let response = await generateImage(imageName, prompt);

      this.imgPathUrl = response ? response : "PATH FOIREUX";    
    }
  }
  
  module.exports = Universe;