const express = require('express');
const router = express.Router();
const characterController = require("../controllers/characterController");

router.get("/universes/:id/characters", characterController.getCharactersByUniverse);
router.post("/", characterController.createCharacter);
router.put("/:id", characterController.updateCharacter);
router.delete("/:id", characterController.deleteCharacter);

module.exports = router;