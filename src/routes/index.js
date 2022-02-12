const route = require('express').Router();

route.use('/vehicles', require('./vehicles'));
route.use('/users', require('./users'));
route.use('/auth', require('./auth'));
route.use('/histories', require('./histories'));
route.use('/popular', require('./popular'));
route.use('/profile', require('./profile'));
route.use('/categories', require('./categories'));
route.use('/userss', require('./userasync'));

module.exports = route;