const conn = require("../services/db");

//Controlleur pour récupérer un message par l'ID de la discussion
exports.getMessagesByDiscussion = (req, res) => {
  const id = parseInt(req.params.id);
  const sql = "SELECT * FROM message WHERE id_discussion = ?";
  const values = [id];

  conn.query(sql, values, (err, results) => {
    if (err) {
      console.error("Erreur lors de la récupération des messages", err);
      res
        .status(500)
        .json({ error: "Erreur lors de la récupération des messages" });
    } else if (results.length > 0) {
      res.status(200).json({ message: results });
    } else {
      res
        .status(404)
        .json({ message: "Aucun message trouvé pour cet id_discussion" });
    }
  });
};

//Controlleur pour créer un message
exports.createMessageByUniverses = (req, res) => {
  const id = parseInt(req.params.id);
  const sql = "SELECT * FROM message WHERE id_discussion = ?";
  const values = [id];

  conn.query(sql, values, (err, results) => {
    if (err) {
      console.error("Erreur lors de la récupération des messages", err);
      res
        .status(500)
        .json({ error: "Erreur lors de la récupération des messages" });
        
    } else if (results.length > 0) {
      res.status(200).json({ message: results });
    } else {
      res
        .status(404)
        .json({ message: "Aucun message trouvé pour cet id_discussion" });
    }
  });
};
// Controlleur pour regénérer le dernier message
exports.repeatMessage = (req, res) => {
  
};
