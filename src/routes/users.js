const users = require('express').Router();
const {getUsers, getUser, createUser, updateUser, deleteUser} = require('../controller/users');
const { verifyUser } = require('../helpers/auth');
const upload = require('../helpers/upload');

users.get('/', verifyUser, getUsers);
users.get('/:id', verifyUser, getUser);
users.post('/', createUser);
users.patch('/', verifyUser, updateUser);
users.patch('/:id', verifyUser, upload.single('image'), updateUser);
users.delete('/:id', verifyUser, deleteUser);
users.delete('/', verifyUser, deleteUser);

module.exports = users;