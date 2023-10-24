class Discussion {
    constructor() {
      this.id = null;
      this.name = null;
      this.description = null;
      this.imgUrl = null;
      this.id_personnage = null;
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
    getImageUrl() {
      return this.imgUrl;
    }
    setImageUrl(imgUrl) {
      this.imgUrl = imgUrl;
    }
  
    // Getter et Setter pour l'ID du personnage
    getPersonnageID() {
      return this.id_personnage;
    }
    setPersonnageID(id_personnage) {
      this.id_personnage = id_personnage;
    }
  
    // Getter et Setter pour l'ID de l'utilisateur
    getUserID() {
      return this.id_user;
    }
    setUserID(id_user) {
      this.id_user = id_user;
    }
  }
  
  module.exports = Discussion;