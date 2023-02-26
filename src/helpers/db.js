const mysql = require('mysql');
// const {DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE} = process.env;

// const mysql = require('promise-mysql');
const db = mysql.createPool({
  user: process.env.DB_USER, // e.g. 'my-db-user'
  password: process.env.DB_PASSWORD, // e.g. 'my-db-password'
  database: process.env.DB_DATABASE, // e.g. 'my-database'
  socketPath: process.env.INSTANCE_UNIX_SOCKET, // e.g. '/cloudsql/project:region:instance'
  // Specify additional properties here.
  // ...config,
});

// module.exports = db;


// const db = async config => {
//   return mysql.createPool({
//     user: process.env.DB_USER, // e.g. 'my-db-user'
//     password: process.env.DB_PASSWORD, // e.g. 'my-db-password'
//     database: process.env.DB_DATABASE, // e.g. 'my-database'
//     socketPath: process.env.INSTANCE_UNIX_SOCKET, // e.g. '/cloudsql/project:region:instance'
//     // Specify additional properties here.
//     ...config,
//   });
// };

module.exports = db;
