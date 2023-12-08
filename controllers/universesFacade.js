const conn = require("../services/db").getInstance();
const Universe = require("../models/universes");

class UniverseFacade {
  async createUniverse(req) {
    const id_user = req.get("X-UserID");
    let universe = Universe.fromMap(req.body);

    try {
      if(await universe.generateDescription() == false){
        res.status(504).json("Service de génération non disponible.");
      } 
      const pathImage = "universe_" + universe.name + "_image";
      universe.generateImage(universe.name);

      const sql = "INSERT INTO univers (name, description, imgPathUrl, id_user) VALUES (?, ?, ?, ?)";
      const values = [universe.name, universe.description, pathImage, id_user];

      return new Promise((resolve, reject) => {
        conn.query(sql, values, (err, result) => {
          if (err) {
            reject({ error: "Erreur lors de la création de l'univers", err });
          } else {
            universe.id = result.insertId;
            resolve({ universe: universe.toMap() });
          }
        });
      });
    } catch (error) {
      throw { error: "Erreur lors de la génération de la description", error };
    }
  }
}

module.exports = new UniverseFacade();
