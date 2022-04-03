const auth = require('express').Router();

const {login, forgotPassword, confirmAccount, changePassword} = require('../controller/auth');
const { verifyUser } = require('../helpers/auth');

auth.post('/login', login);
auth.post('/forgot-password', forgotPassword);
auth.patch('/change-password', verifyUser,changePassword);
auth.post('/account-confirmation', confirmAccount);

module.exports = auth;