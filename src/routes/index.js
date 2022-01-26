const route = require('express').Router()

route.use('/vehicles', require('./vehicles'))
route.use('/add', require('./add'))
route.use('/delete', require('./delete'))

module.exports = route