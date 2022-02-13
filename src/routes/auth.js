const auth = require('express').Router();

const {login, forgotPassword} = require('../controller/auth');

auth.post('/login', login);
auth.post('/forgot-password', forgotPassword);

module.exports = auth;