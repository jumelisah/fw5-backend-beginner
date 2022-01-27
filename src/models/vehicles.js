const db = require('../helpers/db');

exports.getVehicles = (cb)=>{
    db.query('SELECT * FROM vehicles', (err,res)=>{
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
    db.query('INSERT INTO vehicles (name, year, cost, isAvailable, type, seat, class) VALUES (?,?,?,?,?,?,?)',
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
    db.query('UPDATE vehicles SET name=?, year=?, cost=?, isAvailable=?, seat=?, type=?, class=? WHERE id=?',
        data, (err,res)=>{
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