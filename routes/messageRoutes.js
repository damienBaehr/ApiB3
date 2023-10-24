const express = require('express');
const router = express.Router();
const messageController = require("../controllers/messageController");

// Route pour récupérer un message par l'ID de la discussion
router.get("/", messageController.getMessagesByDiscussion);

// Route pour récupérer créer un message
router.get("/", messageController.createMessageByUniverses);

module.exports = router;