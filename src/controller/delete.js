const remove = require('../models/delete')
const vehicleModel = require('../models/vehicles')

const deleteVehicle = (req, res)=>{
    const {id} = req.params
    vehicleModel.getVehicle(id, results=>{
        if(results.length>0){
            remove.deleteVehicle(id, result=>{
                return res.send({
                    success: true,
                    message: 'Deleted'
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

module.exports = {deleteVehicle}