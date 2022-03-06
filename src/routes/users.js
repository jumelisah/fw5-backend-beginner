const users = require('express').Router();
const {getUsers, getUser, createUser, deleteUser, updateUser} = require('../controller/users');
const { verifyUser } = require('../helpers/auth');
const upload = require('../helpers/upload');

users.get('/', verifyUser, getUsers);
users.get('/:id', verifyUser, getUser);
users.post('/', upload.single('image'), createUser);
users.patch('/', verifyUser, updateUser);
users.patch('/:id', verifyUser, updateUser);
users.delete('/:id', verifyUser, deleteUser);
users.delete('/', verifyUser, deleteUser);

module.exports = users;