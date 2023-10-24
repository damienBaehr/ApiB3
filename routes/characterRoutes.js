const express = require('express');
const router = express.Router();
const characterController = require("../controllers/characterController");

router.get("/universes/:id/characters", characterController.getCharactersByUniverse);
router.post("/characters", characterController.createCharacter);
router.put("/character/:id", characterController.updateCharacter);

module.exports = router;