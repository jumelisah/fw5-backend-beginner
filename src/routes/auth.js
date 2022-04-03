const auth = require('express').Router();

const {login, forgotPassword, confirmAccount, changePassword} = require('../controller/auth');

auth.post('/login', login);
auth.post('/forgot-password', forgotPassword);
auth.patch('/change-password', changePassword);
auth.post('/account-confirmation', confirmAccount);

module.exports = auth;