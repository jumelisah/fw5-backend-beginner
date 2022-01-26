const route = require('express').Router()

route.use('/vehicles', require('./vehicles'))
route.post('/add', require('./add'))
route.use('/delete', require('./delete'))

module.exports = route