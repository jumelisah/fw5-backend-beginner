const route = require('express').Router();

route.use('/vehicles', require('./vehicles'));
route.use('/users', require('./users'));
route.use('/auth', require('./auth'));
route.use('/histories', require('./histories'));
route.use('/popular', require('./popular'));
route.use('/profile', require('./profile'));
route.use('/categories', require('./categories'));
route.use('/locations', require('./locations'));
route.use('/payment-status', require('./paymentStatus'));

route.get('/', (req, res)=>{
  return res.json({
    success: true,
    message: 'Backend is running well'
  });
});

module.exports = route;