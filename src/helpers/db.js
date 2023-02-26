const mysql = require('mysql');
// const {DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE} = process.env;

const db = mysql.createPool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  host: process.env.DB_HOST,
  // socketPath: process.env.INSTANCE_UNIX_SOCKET,
});

module.exports = db;
