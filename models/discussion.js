const {generateImage} = require('../api/stableDiffusion')
const {generateDescription}= require('../api/openai');


class Discussion {
    constructor() {
      this.id = null;
      this.name = null;
      this.description = null;
      this.imgUrl = null;
      this.id_personnage = null;
      this.id_user = null;
    }
    static fromMap(map){
      let discussion = new Discussion();
      discussion.name = map.name;
      discussion.description = map.description;
      discussion.imgUrl = map.imgUrl;
      discussion.id_personnage = map.id_personnage;
      discussion.id_user = map.id_user;
        
      return discussion;
    }

    toMap(){
      return {
        id: this.id,
        name: this.name,
        description: this.description,
        imgUrl: this.imgUrl,
        id_personnage: this.id_personnage,
        id_user: this.id_user
      }
    }

    async generateDescription(){
      const prompt = `Génère moi une description pour une discussion, qui a "${this.id_personnage}" comme personnage. La discussion peut-être dans l'univers d'une série, ou d'un film, ou d'un jeu vidéo. La discussion s'appelle : "${this.name}`;
      let response = await generateDescription(prompt);
      this.description = response.choices[0].text;

    }
    async generateImage(){
      const prompt = `Génère moi un background pour le fond d'une discussion mobile. Il faut que ça reste simple, pas trop tape à l'oeil. La discussion s'appelle : "${this.name}"}.`;
      const imageName = "bgDiscussion_" + this.name + "_image";
      const response = await generateImage(imageName, prompt);
      this.imgUrl = response ? response : "PATH FOIREUX";
    }
  }
  
  module.exports = Discussion;