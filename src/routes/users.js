const users = require('express').Router();
const {getUsers, getUser, createUser, updateUser, deleteUser} = require('../controller/users');
const { verifyUser } = require('../helpers/auth');

users.get('/', verifyUser, getUsers);
users.get('/:id', verifyUser, getUser);
users.post('/', createUser);
users.patch('/', verifyUser, updateUser);
users.patch('/:id', verifyUser, updateUser);
users.delete('/:id', verifyUser, deleteUser);
users.delete('/', verifyUser, deleteUser);

module.exports = users;