const updates = require('express').Router()

const {updateVehicle} = require('../controller/vehicles')

updates.post('/:id', updateVehicle)

module.exports = updates