class CharacterCreationObserver {
    constructor() {
      this.nbCharacterLeft = 0;
    }
  
    update(characterName) {
      this.nbCharacterLeft--;
      console.log(`Le personnage ${characterName} a été créé. Il reste ${this.nbCharacterLeft} personnages à créer.`);
      if(this.nbCharacterLeft === 0) {
        console.log("Tous les personnages ont été créés.");
      }
    }
  
    setInitialCharacterCount(count) {
      this.nbCharacterLeft = count;
    }
  }
  
  module.exports = CharacterCreationObserver;