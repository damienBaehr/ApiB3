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

    generateDescription(){
      //Generate with openai
      this.description = "Description generated with openai" + this.name + ", generated by openai";
    }
  }
  
  module.exports = Universe;