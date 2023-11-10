const express = require('express');
const router = express.Router();
const universesController = require("../controllers/universesController");
const characterController = require("../controllers/characterController");
// Route pour créer un univers
router.post("/", universesController.createUniverse);

// Route pour créer un univers et ses personnages
router.post("/characters", characterController.createUniverseAndCharacters);

// Route pour récupérer tous les univers
router.get("/", universesController.getAllUniverses);

// Route pour récupérer un univers par son ID
router.get("/:id", universesController.getUniverseById);

// Route pour mettre à jour un univers
router.put("/:id", universesController.updateUniverse);

// Route pour supprimer un univers par son ID
router.delete("/:id", universesController.deleteUniverse);

module.exports = router;