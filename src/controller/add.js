const addNew = require('../models/add')

const addVehicle = (req,res)=>{
    const data = [req.body.name, req.body.year, req.body.cost, req.body.isAvailable, req.body.type, req.body.seat, req.body.class]
    addNew.addVehicle(data, results=>{
        return res.send({
            success: true,
            message: 'Success add vehicle',
            result: `Rows affected: ${result.affectedRows}`
        })
    })
}

module.exports = {addVehicle}