const conn = require('../services/db').getInstance();
const Universe = require('../models/universes');

// Contrôleur pour créer un univers
exports.createUniverse = async (req, res) => {
  const id_user = req.get("X-UserID");
  let universe = Universe.fromMap(req.body);

  try {
    await universe.generateDescription();
    await universe.generateImage();

    console.log("Test description", universe.description);
    const sql = "INSERT INTO univers (name, description, imgPathUrl, id_user) VALUES (?, ?, ?, ?)";

    const values = [universe.name, universe.description, universe.imgPathUrl, id_user];

    conn.query(sql, values, (err, result) => {
      if (err) {
        res.status(500).json({ error: "Erreur lors de la création de l'univers", err });
      } else {
        universe.id = result.insertId;
        res.status(201).json(universe.toMap());
      }
    });
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la génération de la description", error });
  }
};

// Contrôleur pour récupérer tous les univers
exports.getAllUniverses = (req, res) => {
  const sql = "SELECT * FROM univers";
  conn.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: "Erreur lors de la récupération des univers" });
    } else {
      const univers = rows.map((row) => row);
      res.status(200).json({ univers });
    }
  });
};

// Contrôleur pour récupérer un univers par son ID
exports.getUniverseById = (req, res) => {
  const universesID = parseInt(req.params.id);
  const sql = "SELECT * FROM univers WHERE id = ?";
  conn.query(sql, [universesID], (err, result) => {
    if (err || result.length === 0) {
      res.status(500).json({ error: "Erreur lors de la récupération de l'univers" });
    } else {
      res.status(200).json(result[0]);
    }
  });
};

// Contrôleur pour mettre à jour un univers
exports.updateUniverse = (req, res) => {
  const universeId = req.params.id;
  let universe = Universe.fromMap(req.body);  
  const columns = [];
  const values = [];

  if (universe.name) {
    columns.push("name = ?");
    values.push(universe.name);
  }
  if (universe.description) {
    columns.push("description = ?");
    values.push(universe.description);
  }
  if (universe.imgPathUrl) {
    columns.push("imgPathUrl = ?");
    values.push(universe.imgPathUrl);
  }
  if (universe.id_user) {
    columns.push("id_user = ?");
    values.push(universe.id_user);
  }
  let sql = "UPDATE univers SET " + columns.join(", ") + " WHERE id = ?";
  values.push(universeId);
  conn.query(sql, values, (err, result) => {
    if (err) {
      res.status(500).json({ error: "Erreur lors de la mise à jour de l'univers" });
    } else {
      if (result.affectedRows > 0) {
        res.status(200).json(universe.toMap());
      } else {
        res.status(404).json({ error: "L'univers avec l'ID spécifié n'a pas été trouvé" });
      }
    }
  });
};

// Contrôleur pour supprimer un univers par son ID
exports.deleteUniverse = (req, res) => {
  const universesID = parseInt(req.params.id);
  const sql = "DELETE FROM univers WHERE id = ?";
  conn.query(sql, [universesID], (err, result) => {
    if (err) {
      res.status(500).json({ error: "Erreur lors de la suppression de l'univers" });
    } else {
      // Vérifiez si des enregistrements ont été affectés par la suppression
      if (result.affectedRows > 0) {
        res.status(200).json({ message: "L'univers a été supprimé avec succès" });
      } else {
        res.status(404).json({ error: "L'univers avec l'ID spécifié n'a pas été trouvé" });
      }
    }
  });
};