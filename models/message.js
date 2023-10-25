class Message {
    constructor() {
      this.id = null;
      this.date = null;
      this.text = null;
      this.id_discussion = null;
    }
    
    static fromMap(map){
      let message = new Message();
      message.date = map.date;
      message.text = map.text;
      message.id_discussion = map.id_discussion;
        
      return message;
    }

    toMap(){
      return {
        id: this.id,
        date: this.date,
        text: this.text,
        id_discussion: this.id_discussion
      }
    }
    //Créer une date quand la méthode est appelée

    messageDate(){
      this.date = new Date();
    }
  }
  
  module.exports = Message;