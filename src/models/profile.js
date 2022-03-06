const db = require('../helpers/db');

exports.getProfiles = (cb)=>{
  db.query('SELECT id, name, image, username, email, gender, birthdate FROM users', (err, res)=>{
    if(err) throw err;
    cb(res);
  });
};

exports.getProfile = (id, cb)=>{
  db.query('SELECT id, name, image, username, email, gender, birthdate FROM users WHERE id=?', [id], (err, res)=>{
    if(err) throw err;
    cb(res);
  });
};