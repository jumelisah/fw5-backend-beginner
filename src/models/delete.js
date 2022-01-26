const db = require('../helpers/db')

exports.deleteVehicle = (id, cb)=>{
    db.query('DELETE FROM vehicle WHERE id = ?', [id],
    (err, res)=>{
        if (err) throw err;
        cb(res)
    })
}
