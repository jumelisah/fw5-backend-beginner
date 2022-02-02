const profile = require('express').Router();

const {getProfile} = require('../controller/profile');

profile.get('/', getProfile);
profile.get('/:id', getProfile);

module.exports = profile;