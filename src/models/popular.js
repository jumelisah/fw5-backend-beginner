const db = require('../helpers/db');

exports.popularList = (data, cb)=>{
  db.query(`SELECT v.id AS id, v.name AS name, v.image AS image, v.location AS location, v.seat AS seat, v.qty AS qty, v.cost AS cost, COUNT(h.vehicle_id) AS totalRent FROM vehicles v LEFT JOIN histories h ON v.id=h.vehicle_id WHERE (v.qty>0 OR (DATE('${data.setRentDate}')<DATE(h.rent_date) OR DATE('${data.setRentDate}')>DATE(h.return_date))) AND name LIKE '%${data.name}%' AND v.category_id LIKE '%${data.category}%' AND v.location LIKE '%${data.location}%' AND v.cost>=${data.cost_min} AND v.cost<=${data.cost_max} AND v.type LIKE '%${data.type}%' GROUP BY v.id ORDER BY ${data.sortBy} LIMIT ${data.limit} OFFSET ${data.offset}`, (err, res)=>{
    if(err) throw err;
    cb(res);
  });
};

exports.popularAll =(data)=>new Promise((resolve, reject)=>{
  db.query(`SELECT v.id AS id, v.name AS name, v.year AS year, v.image AS image, COUNT(h.id) AS totalRent FROM vehicles v JOIN history h ON v.id=h.vehicle_id WHERE v.name LIKE '%${data.name}%'`, (err, res)=>{
    if(err) reject(err);
    resolve(res);
  });
});

exports.totalData = (data, cb)=>{
  db.query(`SELECT v.id AS id, v.name AS name, v.image AS image, v.location AS location, v.cost AS cost, COUNT(h.vehicle_id) AS totalRent FROM vehicles v LEFT JOIN histories h ON v.id=h.vehicle_id WHERE (v.qty>0 OR (DATE('${data.setRentDate}')<DATE(h.rent_date) OR DATE('${data.setRentDate}')>DATE(h.return_date))) AND name LIKE '%${data.name}%' AND v.category_id LIKE '%${data.category}%' AND v.location LIKE '%${data.location}%' AND v.cost>=${data.cost_min} AND v.cost<=${data.cost_max} AND v.type LIKE '%${data.type}%' GROUP BY v.id ORDER BY ${data.sortBy}`, (err, res)=>{
    if(err) throw err;
    cb(res);
  });
};

exports.popularId = (data, cb)=>{
  db.query(`SELECT v.id AS vehicle_id, v.name AS vehicle_name, v.year AS year, v.image AS image, v.cost AS cost, v.location AS location, COUNT(*) AS total_rent FROM histories h JOIN vehicles v ON h.vehicle_id=v.id WHERE v.name LIKE '%${data.vehicle_name}%' AND v.location LIKE '%${data.location}%' AND v.cost>=${data.cost_min} AND v.cost<=${data.cost_max} AND v.category_id=${data.category_id} GROUP BY vehicle_id ORDER BY COUNT(*) DESC LIMIT ${data.limit} OFFSET ${data.offset}`, (err, res)=>{
    if(err) throw err;
    cb(res);
  });
};

exports.totalPopularTown = (data, cb)=>{
  db.query(`SELECT COUNT(*) AS total FROM histories h JOIN vehicles v ON h.vehicle_id=v.id WHERE v.location LIKE '%${data.location}%'`, (err, res)=>{
    if(err) throw err;
    cb(res);
  });
};

exports.popularByTown = (data, cb)=>{
  db.query(`SELECT v.name AS vehicle_name, v.year AS year, v.image AS image, v.cost AS cost, v.location AS location, COUNT(*) AS total_rent FROM histories h JOIN vehicles v ON h.vehicle_id=v.id WHERE v.location LIKE '%${data.location}%' GROUP BY vehicle_id ORDER BY COUNT(*) DESC LIMIT ${data.limit} OFFSET ${data.offset}`, (err, res)=>{
    if(err) throw err;
    cb(res);
  });
};

exports.popularMonth = (data, cb)=>{
  db.query(`SELECT v.name AS vehicle_name, v.year AS year, v.cost AS cost, v.location AS location, COUNT(*) AS total_rent FROM histories h JOIN vehicles v ON h.vehicle_id=v.id WHERE v.name LIKE '%${data.vehicle_name}%' AND v.location LIKE '%${data.location}%' AND v.cost>=${data.cost_min} AND v.cost<=${data.cost_max} AND MONTH(h.rent_date)=${data.month} && YEAR(h.rent_date)=${data.year} GROUP BY vehicle_id ORDER BY COUNT(*) DESC LIMIT ${data.limit} OFFSET ${data.offset}`, (err, res)=>{
    if(err) throw err;
    cb(res);
  });
};

exports.popularMonthAndCId = (data, cb)=>{
  db.query(`SELECT v.name AS vehicle_name, v.year AS year, v.cost AS cost, v.location AS location, COUNT(*) AS total_rent FROM histories h JOIN vehicles v ON h.vehicle_id=v.id WHERE v.name LIKE '%${data.vehicle_name}%' AND v.location LIKE '%${data.location}%' AND v.cost>=${data.cost_min} AND v.cost<=${data.cost_max} AND MONTH(h.rent_date)=${data.month} && YEAR(h.rent_date)=${data.year} AND v.category_id=${data.category_id} GROUP BY vehicle_id ORDER BY COUNT(*) DESC LIMIT ${data.limit} OFFSET ${data.offset}`, (err, res)=>{
    if(err) throw err;
    cb(res);
  });
};