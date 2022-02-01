const db = require('../helpers/db');

exports.getHistories = (cb)=>{
  db.query('SELECT histories.id, vehicles.name AS vehicle, users.name AS user_name, rent_date, status FROM histories JOIN users ON histories.user_id=users.id JOIN vehicles ON histories.vehicle_id=vehicles.id', (err,res)=>{
    if(err) throw err;
    cb(res);
  });
};

exports.getHistory = (id, cb)=>{
  db.query('SELECT histories.id, vehicles.name AS vehicle, users.name AS user_name, rent_date, status FROM histories JOIN users ON histories.user_id=users.id JOIN vehicles ON histories.vehicle_id=vehicles.id WHERE histories.id = ?', [id], (err,res)=>{
    if(err) throw err;
    cb(res);
  });
};

exports.addHistories = (data, cb)=>{
  db.query('INSERT INTO histories (vehicle_id, user_id, status) VALUES(?,?,?)', data, (err, res)=>{
    if(err) throw err;
    cb(res);
  });
};

exports.updateHistory = (data, cb)=>{
  db.query('UPDATE histories SET vehicle_id=?, user_id=?, status=? WHERE id=?', data, (err,res)=>{
    if(err) throw err;
    cb(res);
  });
};

exports.deleteHistory = (id, cb)=>{
  db.query('DELETE FROM histories WHERE id=?', [id], (err, res)=>{
    if(err) throw err;
    cb(res);
  });
};