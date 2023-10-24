const conn = require('../services/db')


// Contrôleur pour créer une discussion
exports.createDiscussion = (req, res) => {
  const id_user = req.get("X-UserID");
  const id_personnage = req.get("X-CharacterID");
  const { name, description, imgUrl } = req.body;
  const sql =
    "INSERT INTO discussion (name, description, imgUrl, id_personnage, id_user) VALUES (?, ?, ?, ?, ?)";
  const values = [name, description, imgUrl, id_personnage, id_user];
  conn.query(sql, values, (err, result) => {
    if (err || result.length <= 0) {
      console.error("Erreur lors de l'insertion de la discussion", err);
      res
        .status(500)
        .json({ error: "Erreur lors de la création de la discussion" });
    } else {
      res.status(201).json({ discussion: result});
    }
  });
};
exports.getDiscussion = (req, res) => {
  const sql = "SELECT discussion.id as idDiscussion ,personnage.id as idPersonnage, univers.id as idUnivers, discussion.name FROM discussion JOIN personnage ON discussion.id_personnage = personnage.id JOIN univers ON personnage.univers_id = univers.id";
  conn.query(sql, (err, results) => {
    if (err) {
      console.error("Erreur lors de la récupération des discussions", err);
      res
        .status(500)
        .json({ error: "Erreur lors de la récupération des discussions" });
    } else if (results.length > 0) {
      res.status(200).json({ discussion: results });
    } else {
      res
        .status(404)
        .json({ message: "Aucune discussion trouvée" });
    }
  });
};
exports.getDiscussionByID = (req, res) => {
  const id = parseInt(req.params.id);
  const sql = "SELECT discussion.*, personnage.name as NomPersonnage, univers.id as idUnivers FROM discussion JOIN personnage ON discussion.id_personnage = personnage.id JOIN univers ON personnage.univers_id = univers.id WHERE discussion.id = ?";
  const values = [id];

  conn.query(sql, values, (err, results) => {
    if (err) {
      console.error("Erreur lors de la récupération de la discussion", err);
      res
        .status(500)
        .json({ error: "Erreur lors de la récupération de la discussion" });
    } else if (results.length > 0) {
      res.status(200).json({ discussion: results });
    } else {
      res
        .status(404)
        .json({ message: "Aucune discussion trouvé pour cet ID" });
    }
  });
};


// Contrôleur pour supprimer une discussion par son ID
exports.deleteDiscussion = (req, res) => {
  const discussionID = parseInt(req.params.id);

  const sql = "DELETE FROM discussion WHERE id = ?";
  conn.query(sql, [discussionID], (err, result) => {
    if (err) {
      console.error("Erreur lors de la suppression de la discussion", err);
      res
        .status(500)
        .json({ error: "Erreur lors de la suppression de la discussion" });
    } else {
      // Vérifiez si des enregistrements ont été affectés par la suppression
      if (result.affectedRows > 0) {
        res
          .status(200)
          .json({ message: "La discussion a été supprimée avec succès" });
      } else {
        res
          .status(404)
          .json({ error: "La discussion avec l'ID spécifié n'a pas été trouvée" });
      }
    }
  });
};