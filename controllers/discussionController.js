
const conn = require("../services/db").getInstance();
const Discussion = require("../models/discussion");

// Contrôleur pour créer une discussion
exports.createDiscussion = async (req, res) => {
  const id_user = req.get("X-UserID");
  const id_personnage = req.get("X-CharacterID");

  let discussion = Discussion.fromMap(req.body);

  try {
    if(await discussion.generateDescription() == false){
      res.status(504).json("Service de génération non disponible.");
    }
    if(await discussion.generateDescription() == false){
      res.status(504).json("Service de génération non disponible.");
    }

    const pathImage = "bgDiscussion_" + discussion.name + "_image" ;
    discussion.generateImage();
    const sql =
      "INSERT INTO discussion (name, description, imgUrl, id_personnage, id_user) VALUES (?, ?, ?, ?, ?)";

    const values = [discussion.name,discussion.description,pathImage,id_personnage,id_user,];

    conn.query(sql, values, (err, result) => {
      if (err || result.length <= 0) {
        console.error("Erreur lors de l'insertion de la discussion", err);
        res.status(500).json({ error: "Erreur lors de la création de la discussion", err });
      } else {
        discussion.id = result.insertId;
        discussion.id_personnage = id_personnage;
        discussion.id_user = id_user;
        res.status(201).json({ discussion: discussion.toMap() });
      }
    });
  } catch {
    res.status(500).json({ error: "Erreur lors de la génération de la description" });
  }
};
exports.getDiscussion = (req, res) => {
  const sql =" SELECT discussion.id as idDiscussion ,personnage.id as idPersonnage, univers.id as idUnivers, discussion.name FROM discussion JOIN personnage ON discussion.id_personnage = personnage.id JOIN univers ON personnage.univers_id = univers.id";
  conn.query(sql, (err, results) => {
    if(err){
      res.status(500).json({ error: "Erreur lors de la récupération des discussions" });
    }
    if(results.length <= 0){
      res.status(404).json({ message: "Aucune discussion trouvée" });
    }
    res.status(200).json({ discussion: results });
  });
};
exports.getDiscussionByID = (req, res) => {
  const id = parseInt(req.params.id);
  const sql =
    "SELECT discussion.*, personnage.name as NomPersonnage, univers.id as idUnivers FROM discussion JOIN personnage ON discussion.id_personnage = personnage.id JOIN univers ON personnage.univers_id = univers.id WHERE discussion.id = ?";
  const values = [id];

  conn.query(sql, values, (err, results) => {
    if (err) {
      res.status(500).json({ error: "Erreur lors de la récupération de la discussion" });
    }
    if (results.length <= 0) {
      res.status(404).json({ message: "Aucune discussion trouvée pour cet ID" });
    }
    res.status(200).json({ discussion: results });
  });
};

// Contrôleur pour supprimer une discussion par son ID
exports.deleteDiscussion = (req, res) => {
  const discussionID = parseInt(req.params.id);

  const sql = "DELETE FROM discussion WHERE id = ?";
  conn.query(sql, [discussionID], (err, result) => {
    if(err){
      res.status(500).json({ error: "Erreur lors de la suppression de la discussion" });
    }
    if(result.affectedRows <= 0){
      res.status(404).json({ message: "Aucune discussion trouvée pour cet ID" });
    }
    res.status(200).json({ message: "La discussion a été supprimée avec succès" });
  });
};