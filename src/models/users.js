const db = require('../helpers/db');

exports.getUsers = (data, cb)=>{
  db.query(`SELECT * FROM users WHERE name LIKE '%${data.name}%' LIMIT ${data.limit} OFFSET ${data.offset}`, (err,res)=>{
    if(err) throw err;
    cb(res);
  });
};

exports.getGender = (data, cb)=>{
  db.query(`SELECT * FROM users WHERE name LIKE '%${data.name}%' AND gender=${data.gender} LIMIT ${data.limit} OFFSET ${data.offset}`, (err,res)=>{
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

exports.checkEmail = (email, cb)=>{
  db.query('SELECT * FROM users WHERE email=?', [email], (err, res)=>{
    if(err) throw err;
    cb(res);
  });
};

exports.checkPhone = (phone, cb)=>{
  db.query('SELECT * FROM users WHERE phone_number=?', [phone], (err, res)=>{
    if(err) throw err;
    cb(res);
  });
};

exports.checkUsername = (username, cb)=>{
  db.query('SELECT * FROM users WHERE username=?', [username], (err,res)=>{
    if(err) throw err;
    cb(res);
  });
};

exports.checkContact = (data, cb)=>{
  db.query(`SELECT * FROM users WHERE email='${data.email} OR phone_number='${data.phone_number} AND id!=${data.id}`, (err, res)=>{
    if(err) throw err;
    cb(res);
  });
};

exports.addUser = (data, cb)=>{
  db.query('INSERT INTO users (name, username, email, password, phone_number, gender, birthdate,address) VALUES(?,?,?,?,?,?,?,?)', [data.name, data.username, data.email, data.password, data.phone_number, data.gender, data.birthdate, data.address], (err, res)=>{
    if(err) throw err;
    cb(res);
  });
};

exports.updateUser = (data, id, cb)=>{
  db.query('UPDATE users SET ? WHERE id=?', [data, id], (err,res)=>{
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