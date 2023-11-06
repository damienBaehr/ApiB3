const {generateDescription} = require("../api/openai");
const {generateImage}= require("../api/stableDiffusion");

class Character {
  constructor(name) {
    this._id = null;
    this._name = name;
    this._description = null;
    this._imgPathUrl = null;
    this._id_user = null;
  }
    static fromMap(map){
      let character = new Character(map.name);
      character._id = map.id;
      character._name = map.name;
      character._description = map.description;
      character._imgPathUrl = map.imgPathUrl;
      character._id_user = map.id_user;

      return character;
    }

    toMap(){
      return {
        id: this._id,
        name: this._name,
        description: this._description,
        imgPathUrl: this._imgPathUrl,
        id_user: this._id_user
      }
    }

    async generateDescription(){
      const prompt = `Génère moi la description du personnage : "${this._name}"}`;
      let response = await generateDescription(prompt);
      this._description = response.choices[0].text;
    }

    async generateImage(){
      const prompt = `Génère moi un logo pour le personnage : "${this._name}"}. Il faudrait avoir son visage en portrait.`;
      const imageName = "character_" + this._name + "_image"; 
      let universeFolder = "Marvel";
      const response = await generateImage(imageName, prompt, universeFolder );
      this._imgPathUrl = response ? response : "PATH FOIREUX";
    }
}
module.exports = Character;