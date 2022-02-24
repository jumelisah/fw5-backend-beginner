const db = require('../helpers/db');

exports.popularList = (data, cb)=>{
  db.query(`SELECT h.vehicle_id, v.name AS vehicle_name, v.year AS year, v.image AS image, v.cost AS cost, v.location AS location, COUNT(*) AS total_rent FROM histories h JOIN vehicles v ON h.vehicle_id=v.id WHERE v.name LIKE '%${data.vehicle_name}%' AND v.location LIKE '%${data.location}%' AND v.cost>=${data.cost_min} AND v.cost<=${data.cost_max} GROUP BY vehicle_id ORDER BY COUNT(*) DESC LIMIT ${data.limit} OFFSET ${data.offset}`, (err, res)=>{
    if(err) throw err;
    cb(res);
  });
};
exports.totalData = (cb)=>{
  db.query('SELECT h.vehicle_id, v.name FROM histories h JOIN vehicles v ON h.vehicle_id=v.id GROUP BY h.vehicle_id', (err, res)=>{
    if(err) throw err;
    cb(res);
  });
};

exports.popularId = (data, cb)=>{
  db.query(`SELECT v.name AS vehicle_name, v.year AS year, v.image AS image, v.cost AS cost, v.location AS location, COUNT(*) AS total_rent FROM histories h JOIN vehicles v ON h.vehicle_id=v.id WHERE v.name LIKE '%${data.vehicle_name}%' AND v.location LIKE '%${data.location}%' AND v.cost>=${data.cost_min} AND v.cost<=${data.cost_max} AND v.category_id=${data.category_id} GROUP BY vehicle_id ORDER BY COUNT(*) DESC LIMIT ${data.limit} OFFSET ${data.offset}`, (err, res)=>{
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