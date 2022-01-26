const delVehicle = require('express').Router()

const {deleteVehicle} = require('../controller/delete')

delVehicle.delete('/:id', deleteVehicle)

module.exports = delVehicle
