const db = require('../helpers/db')

exports.addVehicle = (data, cb)=>{
    db.query('INSERT INTO vehicle (name, year, cost, isAvailable, type, seat, class) VALUES (?,?,?,?,?,?,?)',
    data,(err, res)=>{
        if(err) throw error
        cb(res)
    })
}