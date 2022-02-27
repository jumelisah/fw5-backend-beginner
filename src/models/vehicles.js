const db = require('../helpers/db');

exports.getVehicles = (data)=>new Promise((resolve, reject)=>{
  db.query(`SELECT * FROM vehicles WHERE name LIKE '%${data.name}%' AND location LIKE '%${data.location}%' AND cost>=${data.cost_min} AND cost<=${data.cost_max} LIMIT ${data.limit} OFFSET ${data.offset}`, (err, res)=>{
    if(err) reject(err);
    resolve(res);
  });
});

exports.countData = (data)=>new Promise((resolve, reject)=>{
  db.query(`SELECT COUNT(*) AS total FROM vehicles WHERE name LIKE '%${data.name}%' AND location LIKE '%${data.location}%' AND cost>=${data.cost_min} AND cost<=${data.cost_max}`, (err, res)=>{
    if(err) reject(err);
    resolve(res);
  });
});

exports.getVehicle = (id)=>new Promise((resolve, reject)=>{
  db.query(`SELECT * FROM vehicles WHERE id=${id}`, (err, res)=>{
    if(err) reject(err);
    resolve(res);
  });
});

exports.addVehicle = (data)=>new Promise((resolve, reject)=>{
  db.query(`INSERT INTO vehicles (name, image, year, cost, qty, type, seat, category_id, location) VALUES('${data.name}', '${data.image}', '${data.year}', ${data.cost}, ${data.qty}, '${data.type}', ${data.seat}, ${data.category_id}, '${data.location}')`, (err, res)=>{
    if(err) reject(err);
    resolve(res);
  });
});

exports.getVehicleName = (data)=>new Promise((resolve, reject)=>{
  db.query(`SELECT * FROM vehicles WHERE name='${data.name}' && year='${data.year}' && cost=${data.cost} && location='${data.location}'`, (err, res)=>{
    if(err) reject(err);
    resolve(res);
  });
});

exports.getPopularVehicle = (data)=>new Promise((resolve, reject)=>{
  db.query(`SELECT v.id AS id, v.name AS name FROM vehicles v JOIN histories h ON v.id=h.vehicle_id WHERE v.name='%${data.name}%'`, (err, res)=>{
    if(err) reject(err);
    resolve(res);
  });
});

exports.updateVehicle = (data, id)=>new Promise((resolve, reject)=>{
  db.query('UPDATE vehicles SET ? WHERE id=?', [data, id], (err, res)=>{
    if(err) reject(err);
    resolve(res);
  });
});

exports.deleteVehicle = (id)=>new Promise((resolve, reject)=>{
  db.query('DELETE FROM vehicles WHERE id=?', [id], (err, res)=>{
    if(err) reject(err);
    resolve(res);
  });
});