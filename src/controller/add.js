const addNew = require('../models/add')

const addVehicle = (req,res)=>{
    const data = [req.body.name, req.body.year]
    addNew.addVehicle(data, results=>{
        return res.send({
            success: true,
            message: 'Success add vehicle',
            results: results
        })
    })
}

module.exports = {addVehicle}