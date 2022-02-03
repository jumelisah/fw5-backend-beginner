const db = require('../helpers/db');

exports.getHistories = (cb)=>{
  db.query('SELECT h.id, v.name AS vehicle, u.name AS user_name, prepayment, rent_date, return_date FROM histories h JOIN users u ON h.user_id=u.id JOIN vehicles v ON h.vehicle_id=v.id', (err,res)=>{
    if(err) throw err;
    cb(res);
  });
};

exports.getHistory = (id, cb)=>{
  db.query('SELECT h.id, v.name AS vehicle, u.name AS user_name, prepayment, rent_date, return_date FROM histories h JOIN users u ON h.user_id=u.id JOIN vehicles v ON h.vehicle_id=v.id WHERE h.id = ?', [id], (err,res)=>{
    if(err) throw err;
    cb(res);
  });
};

exports.addHistories = (data, cb)=>{
  db.query('INSERT INTO histories (vehicle_id, user_id, prepayment, rent_date, return_date) VALUES(?,?,?,?,?)', data, (err, res)=>{
    if(err) throw err;
    cb(res);
  });
};

exports.updateHistory = (data, cb)=>{
  db.query('UPDATE histories SET vehicle_id=?, user_id=?, prepayment=?, rent_date=?, return_date=? WHERE id=?', data, (err,res)=>{
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