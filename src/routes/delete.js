const delVehicle = require('express').Router()

const {deleteVehicle} = require('../controller/delete')

delVehicle.delete('/:id', deleteVehicle)

module.exports = delVehicle

// const vehicles = require('express').Router()

// const {getVehicles, getVehicle} = require('../controller/vehicles')

// vehicles.get('/', getVehicles)
// vehicles.get('/:id', getVehicle)

// module.exports = vehicles