const express = require('express');
const router = express.Router();
const userController = require("../controllers/userController");

// Route pour créer un utilisateur
router.post("/createUser", userController.createUser);

// Route pour mettre à jour un utilisateur
router.put("/update/:id", userController.updateUser);

// Route pour récupérer un utilisateur par son ID
router.get("/:id", userController.getUserById);

// Route pour récupérer tous les utilisateurs
router.get("/", userController.getAllUsers);

// Route pour s'authentifier
router.post("/auth", userController.authentification);

module.exports = router;