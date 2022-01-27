const db = require('../helpers/db')

exports.updateVehicle = (data, cb)=>{
    db.query('UPDATE vehicle SET name=?, year=?, cost=?, isAvailable=?, seat=?, type=?, class=? WHERE id=?',
    data, (err,res)=>{
        if(err) throw err;
        cb(res)
    })
}