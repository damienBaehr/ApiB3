const ConnFactory = require("../services/db");
const conn = ConnFactory.createInstance();
const Character = require("../models/character");
const characterFacade = require("../controllers/characterFacade");

// Contrôleur pour récupérer tous les personnages d'un univers
exports.getCharactersByUniverse = (req, res) => {
  const id = parseInt(req.params.id);
  const sql = "SELECT * FROM personnage WHERE univers_id = ?";
  const values = [id];

  conn.query(sql, values, (err, results) => {
    if (err) {
      console.error("Erreur lors de la récupération des personnages", err);
      res.status(500).json({ error: "Erreur lors de la récupération des personnages" });
    } else if (results.length > 0) {
      res.status(200).json({ characters: results });
    } else {
      res.status(404).json({ message: "Aucun personnage trouvé pour cet univers_id" });
    }
  });
};

// Contrôleur pour créer un personnage
exports.createCharacter = async (req, res) => {
  try {
    const univers_id = req.get("X-UniversID");
    await characterFacade.createCharacter( univers_id, req.body.name , null,req,res);
    
  } catch (error) {
    console.log(error);
    res.status(500).json("Erreur lors de la création du personnage");
  }
};

exports.createUniverseAndCharacters = async (req, res) => {
  try {
    await characterFacade.createUniverseAndCharacters(req, res);
    // res.status(201).json(result);
  } catch (error) {
    // res.status(500).json("erreur lors de la création du personnage et de l'univers)");
  }
};

// Contrôleur pour mettre à jour un personnage
exports.updateCharacter = async (req, res) => {
  const characterId = req.params.id;
  const characterData = Character.fromMap(req.body);

  try {
    const result = await characterFacade.updateCharacter(characterId, characterData, res);
    if (result.error) {
      res.status(404).json(result.error);
    }
    res.status(200).json(result.character);
  } catch (error) {
    console.log(error)
    res.status(500).json(error);
  }
};

// Contrôleur pour supprimer un personnage par son ID
exports.deleteCharacter = (req, res) => {
  const characterId = parseInt(req.params.id);
  const sql = "DELETE FROM personnage WHERE id = ?";
  conn.query(sql, [characterId], (err, result) => {
    if (err) {
      res
        .status(500)
        .json({ error: "Erreur lors de la suppression du personnage" });
    } else {
      // Vérifiez si des enregistrements ont été affectés par la suppression
      if (result.affectedRows > 0) {
        res
          .status(200)
          .json({ message: "Le personnage a été supprimé avec succès" });
      } else {
        res
          .status(404)
          .json({
            error: "Le personnage avec l'ID spécifié n'a pas été trouvé",
          });
      }
    }
  });
};