const addNew = require('express').Router()

const {addVehicle} = require('../controller/add')

addNew.post('/', addVehicle)

module.exports = addNew
