const update = require('express').Router()

const {updateVehicle} = require('../controller/update')

update.patch('/:id', updateVehicle)

module.exports = update