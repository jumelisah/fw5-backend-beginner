const vehicles = require('express').Router()

const {getVehicles} = require('../controller/vehicles')

vehicles.get('/', getVehicles)

module.exports = vehicles