const profile = require('express').Router();

const {getProfile, editProfile} = require('../controller/profile');
const { verifyUser } = require('../helpers/auth');
const uploadImage = require('../helpers/upload');

profile.get('/', verifyUser, getProfile);
profile.patch('/', verifyUser, uploadImage('image', 1), editProfile);

module.exports = profile;