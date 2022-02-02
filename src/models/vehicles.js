const db = require('../helpers/db');

exports.getVehicles = (data, cb)=>{
  db.query(`SELECT * FROM vehicles WHERE name LIKE '%${data.name}%' LIMIT ${data.limit} OFFSET ${data.offset}`, (err,res)=>{
    if (err) throw err;
    cb(res);
  });
};

exports.getVehicle = (id, cb)=>{
  db.query('SELECT * FROM vehicles WHERE id=?',[id], (err,res)=>{
    if (err) throw err;
    cb(res);
  });
};

exports.addVehicle = (data, cb)=>{
  db.query('INSERT INTO vehicles (name, year, cost, available, type, seat, class, location) VALUES (?,?,?,?,?,?,?,?)',
    data,(err, res)=>{
      if(err) throw err;
      cb(res);
    });
};

exports.checkVehicle = (isThere, cb)=>{
  db.query('SELECT * FROM vehicles WHERE name=?',[isThere], (err,res)=>{
    if (err) throw err;
    cb(res);
  });
};

exports.updateVehicle = (data, cb)=>{
  db.query('UPDATE vehicles SET name=?, year=?, cost=?, available=?, seat=?, type=?, class=?, location=? WHERE id=?', data, (err,res)=>{
    if(err) throw err;
    cb(res);
  });
};

exports.deleteVehicle = (id, cb)=>{
  db.query('DELETE FROM vehicles WHERE id = ?', [id],
    (err, res)=>{
      if (err) throw err;
      cb(res);
    });
};

// exports.isAvailable = (id, cb)=>{
//   db.query('SELECT * FROM vehicles WHERE id')
// }