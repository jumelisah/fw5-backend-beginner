const db = require('../helpers/db');

exports.getHistories = (data)=>new Promise((resolve, reject)=>{
  db.query(`SELECT h.id, v.name AS vehicle, u.name AS user_name, h.total_cost AS cost, h.prepayment AS min_prepayment, rent_date, return_date, status FROM histories h JOIN users u ON h.user_id=u.id JOIN vehicles v ON h.vehicle_id=v.id WHERE v.name LIKE '%${data.vehicle_name}%' LIMIT ${data.limit} OFFSET ${data.offset}`, (err,res)=>{
    if(err) reject(err);
    resolve(res);
  });
});

exports.getHistory = (id)=>new Promise((resolve, reject)=>{
  db.query('SELECT h.id, v.name AS vehicle, u.name AS user_name, h.total_cost AS cost, h.prepayment AS min_prepayment, rent_date, return_date, status FROM histories h JOIN users u ON h.user_id=u.id JOIN vehicles v ON h.vehicle_id=v.id WHERE h.id = ?', [id], (err,res)=>{
    if(err) reject(err);
    resolve(res);
  });
});

exports.getUser = (user_id)=>new Promise((resolve, reject)=>{
  db.query(`SELECT * FROM histories WHERE user_id =${user_id} AND (status='Booked' OR status='Rent' OR status='Wait for payment' OR status='DP')`, (err,res)=>{
    if(err) reject(err);
    resolve(res);
  });
});

exports.userHistories = (data) => new Promise((resolve, reject)=>{
  db.query(`SELECT * FROM histories WHERE user_id=${data.user_id} LIMIT ${data.limit} OFFSET ${data.offset}`, (err, res)=>{
    if(err) reject(err);
    resolve(res);
  });
});

exports.userHistoriesTotal = (user_id) => new Promise((resolve, reject)=>{
  db.query(`SELECT COUNT(*) FROM histories WHERE user_id=${user_id}`, (err, res)=>{
    if(err) reject(err);
    resolve(res);
  });
});

exports.addHistory = (data)=>new Promise((resolve, reject)=>{
  db.query(`INSERT INTO histories (vehicle_id, user_id, sum, total_cost, prepayment, rent_date, return_date) VALUES(${data.vehicle_id}, ${data.user_id}, ${data.sum}, ${data.total_cost}, ${data.prepayment}, ${data.rent_date}, ${data.return_date})`, (err, res)=>{
    if(err) reject(err);
    resolve(res);
  });
});

exports.getVehicleAvailable = (data) => new Promise((resolve, reject)=>{
  db.query(`SELECT * FROM histories  WHERE vehicle_id=${data.vehicle_id} AND (status='Rent' OR status='Booked') AND ((DATE(${data.rent_date})<DATE(rent_date) AND DATE(${data.return_date})<DATE(rent_date)) OR (DATE(${data.rent_date})>DATE(return_date) AND DATE(${data.return_date})>DATE(return_date)))`, (err, res)=>{
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

exports.updateQtyMin = (id, sum)=>new Promise((resolve, reject)=>{
  db.query(`UPDATE vehicles SET qty=qty-${sum} WHERE id=${id}`, (err, res)=>{
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