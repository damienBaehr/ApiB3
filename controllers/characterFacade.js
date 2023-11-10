const ConnFactory = require("../services/db");
const conn = ConnFactory.createInstance();
const Character = require("../models/character");
const universeFacade = require("../controllers/universesFacade");
const CharacterCreationObserver = require("../observers/characterCreationObserver");

class CharacterFacade {
  // Créer un personnage
  async createCharacter(universid, characterName, obs, req, res) {
    const id_user = req.get("X-UserID");
    const univers_id = universid;
    try {
      let character = Character.fromMap(req.body);
      const pathImage = "character_" + character._name + "_image";
      const characterNameToUse = characterName !== undefined && characterName !== null ? characterName : character._name;
      
      if(await character.generateDescription() == false){
        res.status(504).json("Service de génération non disponible.");
      }

      character.generateImage(characterNameToUse);
      const universIdToUse = univers_id !== undefined && univers_id !== null ? univers_id : universid;
      const sql = "INSERT INTO personnage (name, description, imgPathUrl, univers_id, id_user) VALUES (?, ?, ?, ?, ?)";
      const values = [characterNameToUse,character._description,pathImage,universIdToUse,id_user];
        conn.query(sql, values, (err, result) => {
            if (err || result.length <= 0) {
            res.status(500).json({ error: "Erreur lors de la création du personnage", err });
            if(obs !== undefined && obs !== null)
            {obs.update(-1);}
          } else {
            character._id = result.insertId;
            if(obs !== undefined && obs !== null)
            {
              obs.update(characterNameToUse);
            }
            else{
              res.status(201).json( character.toMap() );
            }
          }
      });
    } catch (error) {
      throw {error: "Erreur lors de la génération de la description du personnage",error};
    }

  }

  // Créer un univers et ses personnages
  async createUniverseAndCharacters(req, res) {
    const charactersData = req.body.characters;
    
    try {
      const universeResult = await universeFacade.createUniverse(req);
            
      const obs = new CharacterCreationObserver(res);
      obs.setInitialCharacterCount(charactersData.length);
      obs.setRes(res);
      
      charactersData.map((characterName) => {
        this.createCharacter(universeResult.universe.id ,characterName, obs, req, res);
      });
    } catch (error) {
    }
  }

  //Update un personnage
  async updateCharacter(id, characterData, res) {
    const columns = [];
    const values = [];

    if (characterData._name) {
      columns.push("name = ?");
      values.push(characterData._name);
    }
    if (characterData.description) {
      columns.push("description = ?");
      values.push(characterData.description);
    }
    if (characterData.imgPathUrl) {
      columns.push("imgPathUrl = ?");
      values.push(characterData.imgPathUrl);
    }
    if (characterData.id_user) {
      columns.push("id_character = ?");
      values.push(characterData.id_user);
    }

    let sql = "UPDATE personnage SET " + columns.join(", ") + " WHERE id = ?";
    values.push(id);

    return new Promise((resolve, reject) => {
      conn.query(sql, values, (err, result) => {
        if (err) {
          reject({ error: "Erreur lors de la mise à jour du personnage" });
        } else {
          if (result.affectedRows > 0) {
            res.status(200).json({ updated: characterData});
            resolve({ success: true});
          } else {
            reject({
              error: "Le personnage avec l'ID spécifié n'a pas été trouvé",
            });
          }
        }
      });
    });
  }
}

module.exports = new CharacterFacade();
