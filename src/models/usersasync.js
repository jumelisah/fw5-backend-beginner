const db = require('../helpers/db');

exports.getUsers = ()=>new Promise((resolve, reject)=>{
  db.query('SELECT * FROM users', (err, res)=>{
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

exports.getUserId = (id)=>{
  return new Promise((resolve, reject)=>{
    db.query(`SELECT * FROM users WHERE id=${id}`, (err, res)=>{
      if(err) reject(err);
      resolve(res);
    });
  });
};

exports.createUser = (data)=>{
  return new Promise((resolve, reject)=>{
    db.query(`INSERT INTO users (name, username, email, password, phone_number, gender, birthdate, address) VALUES ('${data.name}', '${data.username}', '${data.email}', '${data.password}', '${data.phone_number}', '${data.gender}', ${data.birthdate}, '${data.address}')`,(err, res)=>{
      if(err) reject(err);
      resolve(res);
    });
  });
};