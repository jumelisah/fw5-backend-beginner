const auth = require('express').Router();

const {login, verify} = require('../controller/auth');

auth.post('/login', login);
auth.post('/verify', verify);

module.exports = auth;