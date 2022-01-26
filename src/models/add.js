const db = require('../helpers/db')

exports.addVehicle = (cb)=>{
    db.query('INSERT INTO vehicle (name, year) VALUES (?,?)',
    data, (err, res)=>{
        if(err) throw error
        cb(res)
    })
}