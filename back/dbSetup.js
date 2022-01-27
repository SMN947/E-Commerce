const mysql = require('mysql');
var connection = mysql.createConnection({
  host: '104.223.107.182',
  user: 'mc163320',
  password: '31946d1c78',
  database: 'mc163320'
});
connection.connect(function (err) {
  if (err) throw err;
  console.log("Database Connected!");
});
module.exports = connection;
