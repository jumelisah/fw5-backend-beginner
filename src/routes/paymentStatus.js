const paymentStatus = require('express').Router();
const { getPaymentStatus, createPayment, getPaymentDetail } = require('../controller/paymentStatus');
    
paymentStatus.get('/', getPaymentStatus);
paymentStatus.get('/:id', getPaymentDetail);
paymentStatus.post('/', createPayment);

module.exports = paymentStatus;
