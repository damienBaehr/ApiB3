const mysql = require('mysql2');
class Conn {

  static instance;

  static getInstance() {
    if (!Conn.instance) {
      Conn.instance = new Conn();
      this.instance.connect();
    }
    return Conn.instance;
  }

  constructor() {
    this.connection = mysql.createConnection({
      host: 'localhost',
      user: 'admin',
      password: '1234',
      database: 'chatbotapp'
    });
  }

  connect() {
    this.connection.connect((err) => {
      if (err) throw err;
      console.log('Vous êtes maintenant connecté à la base de données');
    });
  }

  query(sql, values, callback) {
    this.connection.query(sql, values, callback);
  }

  close() {
    this.connection.end((err) => {
      if (err) throw err;
      console.log('Vous êtes maintenant déconnecté de la base de données');
    });
  }
}
module.exports = Conn;