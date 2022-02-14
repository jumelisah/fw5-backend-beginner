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
  db.query(`SELECT id, username, email, password, role, is_confirmed FROM users WHERE username='${username}' OR email='${username}'`, (err, res)=>{
    if(err) reject(err);
    resolve(res);
  });
});

exports.requestCode = (data)=>new Promise((resolve, reject)=>{
  db.query(`INSERT INTO confirm_code (user_id, code, expired_date, type) VALUES(${data.user_id}, ${data.code}, ${data.expired_date}, ${data.type})`, (err, res)=>{
    if(err) reject(err);
    resolve(res);
  });
});

exports.updateReqCode = (id)=>new Promise((resolve, reject)=>{
  db.query('UPDATE confirm_code SET status = 0 WHERE id=?', [id], (err, res)=>{
    if(err) reject(err);
    resolve(res);
  });
});

exports.updatePassword = (password, id)=>new Promise((resolve, reject)=>{
  db.query('UPDATE users SET password=? WHERE id=?', [password, id], (err, res)=>{
    if(err) reject(err);
    resolve(res);
  });
});

exports.codeCompare = (code, user_id)=>new Promise((resolve, reject)=>{
  db.query(`SELECT * FROM confirm_code WHERE code=${code} AND user_id=${user_id}`, (err, res)=>{
    if(err) reject(err);
    resolve(res);
  });
});

exports.statusConfirm = (user_id)=>new Promise((resolve, reject)=>{
  db.query(`UPDATE users SET is_confirmed=1 WHERE id=${user_id}`, (err, res)=>{
    if(err) reject(err);
    resolve(res);
  });
});
