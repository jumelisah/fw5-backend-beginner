const vehicles = require('express').Router();

const {getVehicles, getVehicle, addVehicle, updateVehicle, deleteVehicle, getPopularVehicle} = require('../controller/vehicles');
const { verifyUser } = require('../helpers/auth');
const upload = require('../helpers/upload');

vehicles.get('/', getVehicles);
vehicles.get('/popular', getPopularVehicle);
vehicles.get('/:id', getVehicle);
vehicles.post('/', verifyUser, addVehicle);
vehicles.patch('/', verifyUser, updateVehicle);
vehicles.patch('/:id', verifyUser, upload.single('image'), updateVehicle);
vehicles.delete('/', verifyUser, deleteVehicle);
vehicles.delete('/:id', verifyUser, deleteVehicle);

module.exports = vehicles;