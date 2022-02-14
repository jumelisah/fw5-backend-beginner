const db = require('../helpers/db');

exports.getHistories = (data)=>new Promise((resolve, reject)=>{
  db.query(`SELECT h.id, v.name AS vehicle, u.name AS user_name, h.cost AS cost, prepayment, rent_date, return_date, status FROM histories h JOIN users u ON h.user_id=u.id JOIN vehicles v ON h.vehicle_id=v.id WHERE v.name LIKE '%${data.vehicle_name}%' LIMIT ${data.limit} OFFSET ${data.offset}`, (err,res)=>{
    if(err) reject(err);
    resolve(res);
  });
});

exports.getHistory = (id)=>new Promise((resolve, reject)=>{
  db.query('SELECT h.id, v.name AS vehicle, u.name AS user_name, h.cost AS cost, prepayment, rent_date, return_date, status FROM histories h JOIN users u ON h.user_id=u.id JOIN vehicles v ON h.vehicle_id=v.id WHERE h.id = ?', [id], (err,res)=>{
    if(err) reject(err);
    resolve(res);
  });
});

exports.getUser = (user_id)=>new Promise((resolve, reject)=>{
  db.query(`SELECT * FROM histories WHERE user_id =${user_id} AND status='Booked'`, (err,res)=>{
    if(err) reject(err);
    resolve(res);
  });
});

exports.addHistory = (data)=>new Promise((resolve, reject)=>{
  db.query(`INSERT INTO histories (vehicle_id, user_id, cost, prepayment, remain_payment, rent_date, return_date) VALUES(${data.vehicle_id}, ${data.user_id}, ${data.cost}, ${data.prepayment}, ${data.remain_payment}, ${data.rent_date}, ${data.return_date})`, (err, res)=>{
    if(err) reject(err);
    resolve(res);
  });
});

exports.updateHistory = (data, id)=>new Promise((resolve, reject)=>{
  db.query('UPDATE  histories SET ? WHERE id=?', [data, id], (err, res)=>{
    if(err) reject(err);
    resolve(res);
  });
});

exports.updateQtyMin = (id)=>new Promise((resolve, reject)=>{
  db.query('UPDATE vehicles SET qty=qty-1 WHERE id=?', [id], (err, res)=>{
    if(err) reject(err);
    resolve(res);
  });
});

exports.updateVehicle = (id)=>new Promise((resolve, reject)=>{
  db.query('UPDATE vehicles SET qty=qty+1 WHERE id=?', [id], (err, res)=>{
    if(err) reject(err);
    resolve(res);
  });
});

exports.deleteHistory = (id)=>new Promise((resolve, reject)=>{
  db.query('DELETE FROM histories WHERE id=?', [id], (err, res)=>{
    if(err) reject(err);
    resolve(res);
  });
});