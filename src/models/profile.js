const db = require('../helpers/db');

exports.getProfile = (id, cb)=>{
  db.query('SELECT name, email, phone_number, gender, birthdate, address FROM users WHERE id=?', [id], (err, res)=>{
    if(err) throw err;
    cb(res);
  });
};