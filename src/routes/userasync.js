const userss = require('express').Router();

const {createUser} = require('../controller/userasync');

userss.post('/', createUser);

module.exports = userss;