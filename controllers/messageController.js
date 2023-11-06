const conn = require("../services/db");
const Message = require("../models/message");
const openAi = require("../api/openai");
//Controlleur pour récupérer un message par l'ID de la discussion
exports.getMessagesByDiscussion = (req, res) => {
  const id = parseInt(req.params.id);
  const sql = "SELECT * FROM message WHERE id_discussion = ?";
  const values = [id];

  conn.query(sql, values, (err, results) => {
    if(err) {
      res.status(500).json({ error: "Erreur lors de la récupération des messages" });
    }
    if(results.length <= 0){
      res.status(404).json({ message: "Aucun message trouvé pour cet id_discussion" });
    }
    res.status(200).json({ messages: results });
  });
};

//Controlleur pour créer un message
exports.createMessageByDiscussion = (req, res) => {
  let message = Message.fromMap(req.body);
  const id = parseInt(req.params.id);
  message.messageDate();
  const sql = "INSERT INTO message (date, text, id_discussion) VALUES (?, ?, ?)";
  const values = [message.date, message.text, id];

  conn.query(sql, values, async (err, result) => {
    if (err || result.affectedRows === 0) {
      res.status(500).json({ error: "Erreur lors de la création du message", err });
    }
    message.id = result.insertId;

    const answer = await openAi.generateAnswer(21);
    const sql = "INSERT INTO message (date, text, id_discussion) VALUES (?, ?, ?)";
    const values = [message.date, answer, id];

    conn.query(sql, values, async (err, result) => {
      if (err || result.affectedRows === 0) {
        res.status(500).json({ error: "Erreur lors de la création du message", err });
      }
      message.id = result.insertId;
    });
    res.status(201).json({ message: message.toMap(), aswner: answer.choices[0].message });
  });
};