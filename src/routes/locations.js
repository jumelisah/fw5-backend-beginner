const locations = require('express').Router();
const { getLocation, addLocations, editLocation, deleteLocation, getLocationById } = require('../controller/locations');
const { verifyUser } = require('../helpers/auth');

locations.get('/', getLocation);
locations.get('/:id', getLocationById);
locations.post('/', verifyUser, addLocations);
locations.patch('/:id', verifyUser, editLocation);
locations.delete('/:id', verifyUser, deleteLocation);

module.exports = locations;
