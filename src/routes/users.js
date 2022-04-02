const users = require('express').Router();
const {getUsers, getUser, createUser, deleteUser, updateUser} = require('../controller/users');
const { verifyUser } = require('../helpers/auth');
const uploadImage = require('../helpers/upload');

users.get('/', verifyUser, getUsers);
users.get('/:id', verifyUser, getUser);
users.post('/', createUser);
users.patch('/', verifyUser, uploadImage('image', 1), updateUser);
users.patch('/:id', verifyUser, uploadImage('image', 1), updateUser);
users.delete('/:id', verifyUser, deleteUser);
users.delete('/', verifyUser, deleteUser);

module.exports = users;