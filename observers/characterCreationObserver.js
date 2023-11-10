
class CharacterCreationObserver {
    constructor() {
      this.res = null;
      this.nbCharacterLeft = 0;

      
    }

    update(characterName) {
      if (!this.res) {
        console.error("L'objet 'res' n'est pas défini dans l'observateur.");
        return;
      }
      if (characterName === -1) {
        this.res.status(500).json({ message: "Erreur lors de la création des personnages." });
        console.log("Erreur lors de la création du personnage.");
        return;
      }
      this.nbCharacterLeft--;
      console.log(`Le personnage ${characterName} a été créé. Il reste ${this.nbCharacterLeft} personnages à créer.`);
      if (this.nbCharacterLeft === 0) {
        this.res.status(201).json({ message: "L'univers et ses personnages ont été créés." });
        console.log("Tous les personnages ont été créés." );
      }
    } 
    setInitialCharacterCount(count) {
      this.nbCharacterLeft = count;
    }
    setRes(res) {
      this.res = res;
    }
  
  }
  
  module.exports = CharacterCreationObserver;