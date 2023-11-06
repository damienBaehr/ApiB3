const conn = require("../services/db").getInstance();
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
    
    const answer = await openAi.generateAnswer(id);
    
    const textResponse = answer.choices[0].message.content;

    const sql2 = "INSERT INTO message (date, text, id_discussion) VALUES (NOW(), ?, ?)";
    const values2 = [textResponse, id];

    conn.query(sql2, values2, async (err2, result2) => {
      if (err2 || result.affectedRows === 0) {
        res.status(500).json({ error: "Erreur lors de la création du message de réponse", err2});
      }
      let id2 = result2.insertId;

      res.status(201).json({ myMessage : message.toMap(), id: id2, content: textResponse });
    });
  });
};