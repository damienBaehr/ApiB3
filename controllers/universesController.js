const conn = require('../services/db')

// Contrôleur pour créer un univers
exports.createUniverse = (req, res) => {
  const { name, description, imgPathUrl } = req.body;
  const id_user = req.get("X-UserID");

  const sql =
    "INSERT INTO univers (name, description, imgPathUrl, id_user) VALUES (?, ?, ?, ?)";
  const values = [name, description, imgPathUrl, id_user];

  conn.query(sql, values, (err, result) => {
    if (err) {
      console.error("Erreur lors de la création de l'univers", err);
      res.status(500).json({ error: "Erreur lors de la création de l'univers" });
    } else {
      res.status(201).json({ message: "Univers créé avec succès", data: result });
    }
  });
};

// Contrôleur pour récupérer tous les univers
exports.getAllUniverses = (req, res) => {
  conn.query("SELECT * FROM univers", (err, rows) => {
    if (err) {
      console.error("Erreur lors de l'exécution de la requête SELECT", err);
      res.status(500).json({ error: "Erreur lors de la récupération des univers" });
    } else {
      const univers = rows.map((row) => row);
      res.status(200).json({ univers });
      console.log(univers);
    }
  });
};

// Contrôleur pour récupérer un univers par son ID
exports.getUniverseById = (req, res) => {
  const universesID = parseInt(req.params.id);
  const sql = "SELECT * FROM univers WHERE id = ?";
  conn.query(sql, [universesID], (err, result) => {
    if (err || result.length === 0) {
      console.error("Erreur lors de l'exécution de la requête SELECT", err);
      res.status(500).json({ error: "Erreur lors de la récupération de l'univers" });
    } else {
      res.status(200).json({ result });
      console.log(result);
    }
  });
};

// Contrôleur pour mettre à jour un univers
exports.updateUniverse = (req, res) => {
  const universeId = req.params.id;
  const { name, description, imgPathUrl, id_user } = req.body;
  const sql =
    "UPDATE univers SET name = ?, description = ?, imgPathUrl = ?, id_user = ? WHERE id = ?";
  conn.query(
    sql,
    [name, description, imgPathUrl, id_user, universeId],
    (err, result) => {
      if (err) {
        console.error("Erreur lors de la mise à jour de l'univers", err);
        res.status(500).json({ error: "Erreur lors de la mise à jour de l'univers" });
      } else {
        // Vérifiez si des enregistrements ont été affectés par la mise à jour
        if (result.affectedRows > 0) {
          res.status(200).json({ message: "L'univers a été mis à jour avec succès" });
        } else {
          res.status(404).json({ error: "L'univers avec l'ID spécifié n'a pas été trouvé" });
        }
      }
    }
  );
};

// Contrôleur pour supprimer un univers par son ID
exports.deleteUniverse = (req, res) => {
  const universesID = parseInt(req.params.id);

  const sql = "DELETE FROM univers WHERE id = ?";
  conn.query(sql, [universesID], (err, result) => {
    if (err) {
      console.error("Erreur lors de la suppression de l'univers", err);
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