const users = require('express').Router();

const {getUsers, getUser, addUser, updateUser, deleteUser} = require('../controller/users');

users.get('/', getUsers);
users.get('/:id', getUser);
users.post('/', addUser);
users.patch('/:id', updateUser);
users.delete('/:id', deleteUser);
users.delete('/', deleteUser);

module.exports = users;