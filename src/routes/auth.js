const auth = require('express').Router();

const {login, forgotPassword, confirmAccount} = require('../controller/auth');

auth.post('/login', login);
auth.post('/forgot-password', forgotPassword);
auth.post('/account-confirmation', confirmAccount);

module.exports = auth;