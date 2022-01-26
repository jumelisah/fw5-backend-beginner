const route = require('express').Router()

route.use('/vehicles', require('./vehicles'))
route.use('/delete', require('./delete'))

module.exports = route