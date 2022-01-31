const vehicles = require('express').Router();

const {getVehicles, getVehicle, addVehicle, updateVehicle, deleteVehicle} = require('../controller/vehicles');

vehicles.get('/', getVehicles);
vehicles.get('/:id', getVehicle);
vehicles.post('/', addVehicle);
vehicles.patch('/:id', updateVehicle);
vehicles.delete('/:id', deleteVehicle);
vehicles.delete('/', deleteVehicle);


module.exports = vehicles;