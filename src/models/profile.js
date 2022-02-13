const db = require('../helpers/db');

exports.getProfile = (id, cb)=>{
  db.query('SELECT name, image, username, email, gender, birthdate FROM users WHERE id=?', [id], (err, res)=>{
    if(err) throw err;
    cb(res);
  });
};