const getVehicles = (req, res)=>{
    return res.json({
        success: true,
        message: "List of Vehicles"
    })
}

module.exports = {getVehicles}