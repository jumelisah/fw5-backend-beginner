const users = require('express').Router();

const {getUsers, getUser, addUser} = require('../controller/users');

users.get('/', getUsers);
users.get('/:id', getUser);
users.post('/', addUser);

module.exports = users;