const db = require('../helpers/db');

exports.login = (data)=>{
  return new Promise((resolve, reject)=>{
    db.query('SELECT * FROM users WHERE username=?', [data.username], (err, res)=>{
      if(err) reject(err);
      resolve(res);
    });
  });
};

exports.getUsername = (username) => new Promise((resolve, reject)=>{
  db.query(`SELECT id, username, email, password, role FROM users WHERE username='${username}' OR email='${username}'`, (err, res)=>{
    if(err) reject(err);
    resolve(res);
  });
});
