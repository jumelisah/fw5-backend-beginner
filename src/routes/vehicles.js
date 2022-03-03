const vehicles = require('express').Router();

const {getVehicles, getVehicle, addVehicle, updateVehicle, deleteVehicle, getPopularVehicle} = require('../controller/vehicles');
const { verifyUser } = require('../helpers/auth');

vehicles.get('/', getVehicles);
vehicles.get('/popular', getPopularVehicle);
vehicles.get('/:id', getVehicle);
vehicles.post('/', verifyUser, addVehicle);
vehicles.patch('/', verifyUser, updateVehicle);
vehicles.patch('/:id', verifyUser, updateVehicle);
vehicles.delete('/', verifyUser, deleteVehicle);
vehicles.delete('/:id', verifyUser, deleteVehicle);

module.exports = vehicles;