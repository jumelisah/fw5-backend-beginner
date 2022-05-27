const response = require('../helpers/response');
const paymentModel = require('../models/paymentStatus');
const {MIDTRANS_SERVER, MIDTRANS_CLIENT} = process.env;


const midtransClient = require('midtrans-client');

let snap = new midtransClient.Snap({
  isProduction : false,
  serverKey : MIDTRANS_SERVER,
  clientKey : MIDTRANS_CLIENT,
});

exports.getPaymentStatus = async(req, res) => {
  try {
    const results = await paymentModel.getPayment();
    const dataResults = [];
    results.forEach(element => {
      const el = {
        id: element.id,
        order_id: element.order_id,
        name: element.name,
        response_midtrans: JSON.parse(element.response_midtrans)
      };
      dataResults.push(el);
    });
    return response(res, 'Payment status list', dataResults, 200, null);
  } catch (e) {
    return response(res, e.message, null, 500);
  }
};

exports.getPaymentDetail = async(req, res) => {
  try {
    const result = await paymentModel.getPaymentByID(req.params.id);
    return response(res, 'Payment detail', result[0]);
  } catch (e) {
    return response(res, e.message, null, 500);
  }
};

exports.getPaymentByOrderId = async(req, res) => {
  try {
    const result = await paymentModel.getPaymentByOrder(req.params.id);
    return response(res, 'Payment detail', result[0]);
  } catch (e) {
    return response(res, e.message, null, 500);
  }
};

exports.createPayment = async (req, res) => {
  try {
    const midtransResponse = await snap.createTransaction(req.body);
    const data = {
      order_id: req.body.transaction_details.order_id,
      name: `${req.body.customer_details.first_name} ${req.body.customer_details.last_name || ''}`,
      gross_amount: req.body.transaction_details.gross_amount,
      response_midtrans: JSON.stringify(midtransResponse)
    };
    const createData = await paymentModel.createPaymentStatus(data);
    const getNewData = await paymentModel.getPaymentByID(createData.insertId);
    return response(res, 'Successfully add new payment', getNewData[0]);
  } catch (e) {
    return response(res, e.message, null, 500);
  }
};

exports.updatePaymentStatus = async(req, res) => {
  try {
    const notif = await snap.transaction.notification(req.body);
    const data = {
      order_id: notif.order_id,
      response_midtrans: JSON.stringify(notif)
    };
    await paymentModel.updateStatus(data);
    const result = await paymentModel.getPaymentByOrder(data.order_id);
    return response(res, 'Payment success', result[0]);
  } catch (e) {
    return response(res, e.message, null, 500);
  }
};
