const profile = require('express').Router();

const {getProfile} = require('../controller/profile');
const { verifyUser } = require('../helpers/auth');

profile.get('/', getProfile);
profile.get('/:id', getProfile);

module.exports = profile;