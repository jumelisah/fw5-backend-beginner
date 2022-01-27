const db = require('../helpers/db')

exports.updateVehicle = (data, cb)=>{
    db.query('UPDATE vehicle SET cost=?, isAvailable = ? WHERE id=?',
    data, (err,res)=>{
        if(err) throw err;
        cb(res)
    })
}