class Message {
    constructor() {
      this.id = null;
      this.date = null;
      this.text = null;
      this.id_discussion = null;
    }
  
    // Getter et Setter pour l'ID
    getID() {
      return this.id;
    }
    setID(id) {
      this.id = id;
    }
  
    // Getter et Setter pour la date
    getDate() {
      return this.date;
    }
    setDate(date) {
      this.date = date;
    }
  
    // Getter et Setter pour le texte
    getText() {
      return this.text;
    }
    setText(text) {
      this.text = text;
    }
  
    // Getter et Setter pour l'ID de la discussion
    getDiscussionID() {
      return this.id_discussion;
    }
    setDiscussionID(id_discussion) {
      this.id_discussion = id_discussion;
    }
  }
  
  module.exports = Message;