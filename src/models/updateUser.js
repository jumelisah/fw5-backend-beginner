const db = require('../helpers/db');

exports.updateUser = (data, id)=>new Promise((resolve, reject)=>{
  db.query('UPDATE users SET ? WHERE id=?', [data, id], (err, res)=>{
    if(err) reject(err);
    resolve(res);
  });
});