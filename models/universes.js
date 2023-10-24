class Universe {
    constructor() {
      this.id = null;
      this.name = null;
      this.description = null;
      this.imgPathUrl = null;
      this.id_user = null;
    }
  
    // Getter et Setter pour l'ID
    getID() {
      return this.id;
    }
    setID(id) {
      this.id = id;
    }
  
    // Getter et Setter pour le nom
    getName() {
      return this.name;
    }
    setName(name) {
      this.name = name;
    }
  
    // Getter et Setter pour la description
    getDescription() {
      return this.description;
    }
    setDescription(description) {
      this.description = description;
    }
  
    // Getter et Setter pour l'URL de l'image
    getImagePathUrl() {
      return this.imgPathUrl;
    }
    setImagePathUrl(imgPathUrl) {
      this.imgPathUrl = imgPathUrl;
    }
  
    // Getter et Setter pour l'ID de l'utilisateur
    getUserID() {
      return this.id_user;
    }
    setUserID(id_user) {
      this.id_user = id_user;
    }
  }
  
  module.exports = Universe;