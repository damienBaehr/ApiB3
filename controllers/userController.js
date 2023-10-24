const conn = require('../services/db')
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config({ path: '.env.local' });
const tokenKey = process.env.TOKEN_KEY;

console.log(tokenKey);

// Contrôleur pour créer un utilisateur
exports.createUser = (req, res) => {
  const { pseudo, password, email } = req.body;
  const sql = "INSERT INTO user (pseudo, password, email) VALUES (?, ?, ?)";
  const values = [pseudo, password, email];
  conn.query(sql, values, (err, result) => {
    if (err) {
      console.error("Erreur lors de l'insertion du user", err);
      res.status(500).json({ error: "Erreur lors de la création du user" });
    } else {
      res.status(201).json({ message: "Utilisateur créé avec succès", data: result });
    }
  });
};

// Controller pour update un utilisateur
exports.updateUser = (req, res) => {
  const userID = parseInt(req.params.id);
  const { pseudo, password, email } = req.body;
  const sql = "UPDATE user SET pseudo = ?, password = ?, email = ? WHERE id = ?";
  const values = [pseudo, password, email, userID];
  conn.query(sql, values, (err, result) => {
    if (err) {
      console.error("Erreur lors de la mise à jour du user", err);
      res.status(500).json({ error: "Erreur lors de la mise à jour du user" });
    } else {
      res.status(200).json({ message: "Utilisateur mis à jour avec succès", data: result });
    }
  });
};

// Controller pour s'authentifier en tant qu'utilisateur, et récupérer un token
exports.authentification = (req, res) => {
  const { pseudo, password } = req.body;
  const sql = "SELECT * FROM user WHERE pseudo = ? AND password = ?";
  const values = [pseudo, password];
  conn.query(sql, values, (err, result) => {
    if (err) {
      console.error("Erreur lors de l'authentification", err);
      res.status(500).json({ error: "Erreur lors de l'authentification" });
    } else if (result.length > 0) {
      const token = jwt.sign({ id: result[0].id }, tokenKey, { expiresIn: "24h" }, {algorithm: 'RS256'});
      res.status(200).json({ message: "Authentification réussie", token: token, data: result });
    } else {
      res.status(401).json({ message: "Authentification échouée" });
    }
  });
};

// Contrôleur pour récupérer un utilisateur par son ID
exports.getUserById = (req, res) => {
  const userID = parseInt(req.params.id);
  const sql = "SELECT * FROM user WHERE id = ?";
  conn.query(sql, [userID], (err, result) => {
    if (err) {
      console.error("Erreur lors de l'exécution de la requête SELECT", err);
      res.status(500).json({ error: "Erreur lors de la récupération de l'utilisateur" });
    } else {
      res.status(200).json({ user: result[0] });
      console.log(result[0]);
    }
  });
};

// Contrôleur pour récupérer tous les utilisateurs
exports.getAllUsers = (req, res) => {
  conn.query("SELECT * FROM user", (err, rows, result) => {
    if (err || rows.length === 0) {
      console.error("Erreur lors de l'exécution de la requête SELECT", err);
      res.status(500).json({ error: "Erreur lors de la récupération des utilisateurs" });
    } else {
      res.status(200).json({ result });
      console.log(result);
    }
  });
};