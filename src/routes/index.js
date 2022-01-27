const route = require('express').Router()

route.use('/vehicles', require('./vehicles'))
route.use('/add', require('./add'))
route.use('/delete', require('./delete'))
route.use('/update', require('./update'))

module.exports = route