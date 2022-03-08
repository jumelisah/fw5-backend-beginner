const db = require('../helpers/db');


exports.getProfile = (id, cb)=>{
  db.query('SELECT id, name, image, username, email, phone_number, gender, DATE(birthdate) AS birthdate, role, address, YEAR(register_at) AS registerYear FROM users WHERE id=?', [id], (err, res)=>{
    if(err) throw err;
    cb(res);
  });
};