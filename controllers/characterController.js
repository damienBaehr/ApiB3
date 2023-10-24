const conn = require('../services/db');

exports.getCharactersByUniverse = (req, res) => {
  const id = parseInt(req.params.id);
  const sql = "SELECT * FROM personnage WHERE univers_id = ?";
  const values = [id];

  conn.query(sql, values, (err, results) => {
    if (err) {
      console.error("Erreur lors de la récupération des personnages", err);
      res
        .status(500)
        .json({ error: "Erreur lors de la récupération des personnages" });
    } else if (results.length > 0) {
      res.status(200).json({ characters: results });
    } else {
      res
        .status(404)
        .json({ message: "Aucun personnage trouvé pour cet univers_id" });
    }
  });
};

exports.createCharacter = (req, res) => {
  const id_user = req.get("X-UserID");
  const { name, description, imgPathUrl, univers_id } = req.body;
  const sql =
    "INSERT INTO personnage (name, description, imgPathUrl, univers_id, id_user) VALUES (?, ?, ?, ?, ?)";
  const values = [name, description, imgPathUrl, univers_id, id_user];

  conn.query(sql, values, (err, result) => {
    if (err || result.length <= 0) {
      console.error("Erreur lors de l'insertion du personnage", err);
      res
        .status(500)
        .json({ error: "Erreur lors de la création du personnage" });
    } else {
      res.status(201).json({ character: result });
    }
  });
};

exports.updateCharacter = (req, res) => {
  const characterId = req.params.id;
  const id_user = req.get("X-UserID");
  const { name, description, imgPathUrl, univers_id } = req.body;
  const sql =
    "UPDATE personnage SET name = ?, description = ?, imgPathUrl = ?, univers_id = ?, id_user = ? WHERE id = ?";
  conn.query(
    sql,
    [name, description, imgPathUrl, univers_id, id_user, characterId],
    (err, result) => {
      if (err) {
        console.error("Erreur lors de la mise à jour du personnage", err);
        res
          .status(500)
          .json({ error: "Erreur lors de la mise à jour du personnage" });
      } else {
        if (result.affectedRows > 0) {
          res
            .status(200)
            .json({ message: "Le personnage a été mis à jour avec succès" });
        } else {
          res
            .status(404)
            .json({ error: "Le personage avec l'ID spécifié n'a pas été trouvé" });
        }
      }
    }
  );
};