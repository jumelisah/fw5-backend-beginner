const addNew = require('../models/add')

const addVehicle = (req,res)=>{
    const data = [req.body.name, req.body.year, req.body.cost, req.body.isAvailable, req.body.type, req.body.seat, req.body.class]
    let isThere = req.body.name
    addNew.checkVehicle(isThere, result=>{
        let yesThere = 0
        if(result.length>1){
            result.forEach(element=>{
                if(element.year===req.body.year){
                    yesThere++
                }
            })
        }
        if(yesThere<1){
            addNew.addVehicle(data, results=>{
                return res.send({
                    success: true,
                    message: 'Success add vehicle',
                    results: `Rows affected: ${results.affectedRows}`
                })
            })
        }else{
            return res.status(400).send({
                success: false,
                message: 'Vehicle already on the list'
            })
        }
    })
}

module.exports = {addVehicle}