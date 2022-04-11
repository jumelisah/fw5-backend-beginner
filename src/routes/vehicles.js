const vehicles = require('express').Router();

const {getVehicles, getVehicle, addVehicle, updateVehicle, deleteVehicle, getPopularVehicle} = require('../controller/vehicles');
const { verifyUser } = require('../helpers/auth');
const uploadImage = require('../helpers/upload');

vehicles.get('/', getVehicles);
vehicles.get('/popular', getPopularVehicle);
vehicles.get('/:id', getVehicle);
vehicles.post('/', verifyUser, uploadImage('image', 1), addVehicle);
vehicles.patch('/', verifyUser, uploadImage('image', 1), updateVehicle);
vehicles.patch('/:id', verifyUser, uploadImage('image', 1), updateVehicle);
vehicles.patch('/delete/:id', verifyUser, deleteVehicle);

module.exports = vehicles;