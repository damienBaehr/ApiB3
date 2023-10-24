const express = require('express');
const router = express.Router();
const discussionController = require("../controllers/discussionController");

// Route pour créer une discussion
router.post("/", discussionController.createDiscussion);

// Route pour aller chercher des discussions
router.get('/', discussionController.getDiscussion);

// Route pour aller chercher une discussion
router.get('/:id', discussionController.getDiscussionByID);

// Route pour supprimer une discussion par son ID
router.delete("/:id", discussionController.deleteDiscussion);

module.exports = router;