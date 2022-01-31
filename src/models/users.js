const db = require('../helpers/db');

exports.getUsers = (cb)=>{
  db.query('SELECT * FROM users', (err,res)=>{
    if(err) throw err;
    cb(res);
  });
};

exports.getUser = (id, cb)=>{
  db.query('SELECT * FROM users WHERE id =?', [id], (err, res)=>{
    if(err) throw err;
    cb(res);
  });
};

exports.checkContact = (contact, cb)=>{
  db.query('SELECT * FROM users WHERE email=? OR phone_number=?', contact, (err, res)=>{
    if(err) throw err;
    cb(res);
  });
};

exports.addUser = (data, cb)=>{
  db.query('INSERT INTO users (name, email, password, phone_number, gender, birthdate, address) VALUES(?,?,?,?,?,?,?)', data, (err, res)=>{
    if(err) throw err;
    cb(res);
  });
};

exports.updateUser = (data, cb)=>{
  db.query('UPDATE users SET name=?, email=?, password=?, phone_number=?, gender=?, birthdate=?, address=? WHERE id=?', data, (err,res)=>{
    if(err) throw err;
    cb(res);
  });
};

exports.deleteUser = (id, cb)=>{
  db.query('DELETE FROM users WHERE id=?', [id], (err,res)=>{
    if(err) throw err;
    cb(res);
  });
};