const paymentStatus = require('express').Router();
const { getPaymentStatus, createPayment, getPaymentDetail, updatePaymentStatus, getPaymentByOrderId } = require('../controller/paymentStatus');
    
paymentStatus.get('/', getPaymentStatus);
paymentStatus.get('/:id', getPaymentDetail);
paymentStatus.get('/order/:id', getPaymentByOrderId);
paymentStatus.post('/', createPayment);
paymentStatus.post('/update', updatePaymentStatus);

module.exports = paymentStatus;
