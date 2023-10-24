
const mysql = require('mysql2');
const conn = mysql.createConnection({
    host : 'localhost',
    user : 'admin',
    password: '1234',
    database: 'chatbotapp'
})

conn.query('SELECT 1 + 1 AS solution', (err, rows, fields) => {
    if (err) throw err
    console.log('The solution is: ', rows[0].solution)
  })

conn.connect();

module.exports = conn;