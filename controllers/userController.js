const conn = require('../services/db')
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const User = require('../models/user');

dotenv.config({ path: '.env.local' });
const tokenKey = process.env.TOKEN_KEY;

// Contrôleur pour créer un utilisateur
exports.createUser = (req, res) => {
  let user = User.fromMap(req.body);  
  const sql = "INSERT INTO user (pseudo, password, email) VALUES (?, ?, ?)";
  const values = [user._pseudo, user._password, user._email];
  conn.query(sql, values, (err, result) => {
    if (err) {
      console.error("Erreur lors de l'insertion du user", err);
      res.status(500).json({ error: "Erreur lors de la création du user" });
    } else {
      user._id = result.insertId;
      res.status(201).json({ message: "Utilisateur créé avec succès !", Créé: user.toMap()});
    }
  });
};

// Controller pour update un utilisateur
exports.updateUser = (req, res) => {
  const userID = parseInt(req.params.id);
  let user = User.fromMap(req.body); 

  const columns = [];
  const values = [];

  if (user._pseudo) {
    columns.push("pseudo = ?");
    values.push(user.pseudo);
  }
  if (user._password) {
    columns.push("password = ?");
    values.push(user.password);
  }
  if (user._email) {
    columns.push("email = ?");
    values.push(user.email);
  }

  let sql = "UPDATE user SET " + columns.join(", ") + " WHERE id = ?";
  values.push(userID);

  conn.query(sql, values, (err) => {
    if (err) {
      res.status(500).json({ error: "Erreur lors de la mise à jour du user" });
    } else {
      res.status(200).json({ message: "Utilisateur mis à jour avec succès", data: user.toMap() });
    }
  });
};

// Controller pour s'authentifier en tant qu'utilisateur, et récupérer un token
exports.authentification = (req, res) => {
  let user = User.fromMap(req.body);
  const sql = "SELECT * FROM user WHERE pseudo = ? AND password = ?";
  const values = [user._pseudo, user._password];
  conn.query(sql, values, (err, result) => {
    if (err) {
      res.status(500).json({ error: "Erreur lors de l'authentification" });
    } else if (result.length > 0) {
      const token = jwt.sign({ id: result[0].id }, tokenKey, { expiresIn: "24h" }, {algorithm: 'RS256'});
      res.status(200).json({ message: "Authentification réussie", Token: token, Utilisateur : user.toMap() });
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
      res.status(500).json({ error: "Erreur lors de la récupération de l'utilisateur" });
    } else {
      res.status(200).json({ user: result[0] });
      console.log(result[0]);
    }
  });
};

// Contrôleur pour récupérer tous les utilisateurs
exports.getAllUsers = (req, res) => {
  conn.query("SELECT * FROM user", (err, rows,) => {
    if (err || rows.length === 0) {
      res.status(500).json({ error: "Erreur lors de la récupération des utilisateurs" });
    } else {
      const user = rows.map((row) => row);
      res.status(200).json({ user });
    }
  });
};