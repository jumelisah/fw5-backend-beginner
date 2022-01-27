const update = require('../models/update')
const vehicleModel = require('../models/vehicles')

const updateVehicle = (req, res)=>{
    const {id} = req.params
    const data = [req.body.name, req.body.year, req.body.cost, req.body.isAvailable, req.body.seat, req.body.type, req.body.class, id]
    vehicleModel.getVehicle(id, results=>{
        if(results.length>0){
            update.updateVehicle(data, result=>{
                return res.send({
                    success: true,
                    message: 'Success add vehicle',
                    result: `Rows affected: ${result.affectedRows}`
                })
            })
        }else{
            return res.status(404).send({
                success: false,
                message: 'Vehicle not found'
            })
        }
    })
}

module.exports = {updateVehicle}