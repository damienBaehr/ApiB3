const conn = require("../services/db");
const Message = require("../models/message")

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
      res.status(200).json({ messages: results });
    } else {
      res
        .status(404)
        .json({ message: "Aucun message trouvé pour cet id_discussion" });
    }
  });
};

//Controlleur pour créer un message
exports.createMessageByUniverses = (req, res) => {
  let message = Message.fromMap(req.body);
  message.messageDate();
  const id = parseInt(req.params.id);
  const sql = "INSERT INTO message (date, text, id_discussion) VALUES (?, ?, ?)";
  const values = [message.date, message.text, id];

  conn.query(sql, values, (err, result) => {
    if (err || result.affectedRows === 0) {
      console.error("Erreur lors de l'insertion du message", err);
      res.status(500).json({ error: "Erreur lors de la création du message", err });
    } else {
      message.id = result.insertId;
      res.status(201).json({ discussion: message.toMap() });
    }
  });
};