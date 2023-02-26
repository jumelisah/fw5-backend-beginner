const db = require('../helpers/db');

exports.getUsers = (data)=>new Promise((resolve, reject)=>{
  db.query(`SELECT * FROM users WHERE name LIKE '%${data.name}%' LIMIT ${data.limit} OFFSET ${data.offset}`, (err, res)=>{
    if(err) reject(err);
    resolve(res);
  });
});

exports.countData = (data)=>new Promise((resolve, reject)=>{
  db.query(`SELECT COUNT(*) AS total FROM users WHERE name LIKE '%${data.name}%'`, (err, res)=>{
    if(err) reject(err);
    resolve(res);
  });
});

exports.getUser = (id)=>new Promise((resolve, reject)=>{
  db.query('SELECT * FROM users WHERE id=?', [id], (err, res)=>{
    if(err) reject(err);
    resolve(res);
  });
});

exports.getUserUname = (username)=>new Promise((resolve, reject)=>{
  db.query(`SELECT * FROM users WHERE username='${username}'`, (err, res)=>{
    if(err) reject(err);
    resolve(res);
  });
});

exports.getEmail = (email)=>new Promise((resolve, reject)=>{
  db.query(`SELECT * FROM users WHERE email='${email}'`, (err, res)=>{
    if(err) reject(err);
    resolve(res);
  });
});

exports.getPhone = (phone_number)=>new Promise((resolve, reject)=>{
  db.query(`SELECT * FROM users WHERE phone_number=${phone_number}`, (err, res)=>{
    if(err) reject(err);
    resolve(res);
  });
});

exports.createUser = (data)=> new Promise((resolve, reject)=>{
  db.query(`INSERT INTO users (name, username, email, password, image, role) VALUES ('${data.name}', '${data.username}', '${data.email}', '${data.password}', '${data.image}', 'user')`,(err, res)=>{
    if(err) reject(err);
    resolve(res);
  });
});

exports.updateUser = (data, id)=>new Promise((resolve, reject)=>{
  db.query('UPDATE users SET ? WHERE id=?', [data, id], (err, res)=>{
    if(err) reject(err);
    resolve(res);
  });
});

exports.deleteUser = (id)=>new Promise((resolve, reject)=>{
  db.query('DELETE FROM users WHERE id=?', [id], (err, res)=>{
    if(err) reject(err);
    resolve(res);
  });
});