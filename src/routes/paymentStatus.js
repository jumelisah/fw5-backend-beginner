const paymentStatus = require('express').Router();
const { getPaymentStatus, createPayment, getPaymentDetail, updatePaymentStatus } = require('../controller/paymentStatus');
    
paymentStatus.get('/', getPaymentStatus);
paymentStatus.get('/:id', getPaymentDetail);
paymentStatus.post('/', createPayment);
paymentStatus.post('/update', updatePaymentStatus);

module.exports = paymentStatus;
