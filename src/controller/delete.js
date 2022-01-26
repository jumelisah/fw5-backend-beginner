const remove = require('../models/delete')

const deleteVehicle = (req, res)=>{
    const {id} = req.params
    remove.deleteVehicle(id, results=>{
        if(results.length>0){
            return res.send({
                success: true,
                message: 'Deleted'
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