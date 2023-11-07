const conn = require("../services/db");
const Character = require("../models/character");

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
      res
        .status(404)
        .json({ message: "Aucun personnage trouvé pour cet univers_id" });
    }
  });
};

// Contrôleur pour créer un personnage
exports.createCharacter = async (req, res) => {
  const id_user = req.get("X-UserID");
  const univers_id = req.get("X-UniversID");

  try {
    let character = Character.fromMap(req.body);
    await character.generateDescription();
    await character.generateImage();
    const sql ="INSERT INTO personnage (name, description, imgPathUrl, univers_id, id_user) VALUES ( ?, ?, ?, ?, ?)";
    const values = [character._name, character._description, character._imgPathUrl, univers_id, id_user];

    conn.query(sql, values, (err, result) => {
      if (err || result.length <= 0) {
        res.status(500).json({ error: "Erreur lors de la création du personnage", err });
      } else {
        character._id = result.insertId;
        res.status(201).json({ character: character.toMap() });
      }
    });
  } catch {
    res.status(500).json({error: "Erreur lors de la génération de la description du personnage"});
  }
};

// Contrôleur pour mettre à jour un personnage
exports.updateCharacter = (req, res) => {
  const universId = req.params.id;
  let character = Character.fromMap(req.body);
  const columns = [];
  const values = [];

  if (character._name) {
    columns.push("name = ?");
    values.push(character._name);
  }
  if (character._description) {
    columns.push("description = ?");
    values.push(character._description);
  }
  if (character._imgPathUrl) {
    columns.push("imgPathUrl = ?");
    values.push(character._imgPathUrl);
  }
  if (character._id_user) {
    columns.push("id_character = ?");
    values.push(character._id_user);
  }
  let sql = "UPDATE personnage SET " + columns.join(", ") + " WHERE id = ?";
  values.push(universId);
  conn.query(sql, values, (err, result) => {
    if (err) {
      res
        .status(500)
        .json({ error: "Erreur lors de la mise à jour de l'univers" });
    } else {
      if (result.affectedRows > 0) {
        res.status(200).json(character.toMap());
      } else {
        res
          .status(404)
          .json({
            error: "L'univers avec l'ID spécifié n'a pas été trouvé",
            err,
          });
      }
    }
  });
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