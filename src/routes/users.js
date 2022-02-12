const users = require('express').Router();
const {getUser, addUser, updateUser, deleteUser} = require('../controller/users');
const {getUsers} = require('../controller/userasync');
const { verifyUser } = require('../helpers/auth');

users.get('/', verifyUser, getUsers);
users.get('/:id', getUser);
users.post('/', addUser);
users.patch('/', updateUser);
users.patch('/:id', updateUser);
users.delete('/:id', deleteUser);
users.delete('/', deleteUser);

module.exports = users;