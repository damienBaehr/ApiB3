const express = require('express');
const router = express.Router();
const messageController = require("../controllers/messageController");

// Route pour récupérer un message par l'ID de la discussion
router.get("/:id", messageController.getMessagesByDiscussion);

// Route pour créer un message
router.post("/:id", messageController.createMessageByDiscussion);

module.exports = router;