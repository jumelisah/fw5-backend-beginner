const response = require('../helpers/response');
const paymentModel = require('../models/paymentStatus');


const midtransClient = require('midtrans-client');
// Create Core API instance
let coreApi = new midtransClient.CoreApi({
  isProduction : false,
  serverKey : 'SB-Mid-server-6C4n1N47AxW-bn1TNBuO2pr4',
  clientKey : 'SB-Mid-client-x619BxXG_CKajbM8'
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

exports.createPayment = async (req, res) => {
  try {
    let parameter = {
      'payment_type': 'bank_transfer',
      'bank_transfer': {
        'bank': req.body.bank
      },
      'transaction_details': {
        'order_id': req.body.order_id,
        'gross_amount': req.body.gross_amount
      },
      'customer_details': {
        'email': 'budi.utomo@Midtrans.com',
        'first_name': req.body.first_name,
        'last_name': req.body.last_name || '',
        'phone': '+6281 1234 1234'
      },
    };
    const midtransResponse = await coreApi.charge(parameter);
    console.log(midtransResponse);
    const data = {
      order_id: midtransResponse.order_id,
      name: `${req.body.first_name} ${req.body.last_name || ''}`,
      gross_amount: midtransResponse.gross_amount,
      response_midtrans: JSON.stringify(midtransResponse)
    };
    const createData = await paymentModel.createPaymentStatus(data);
    const getNewData = await paymentModel.getPaymentByID(createData.insertId);
    return response(res, 'Successfully add new payment', getNewData[0]);
  } catch (e) {
    console.log(e);
    return response(res, e.message, null, 500);
  }
};

exports.updatePaymentStatus = async(req, res) => {
  try {
    console.log(req.body);
    const notif = await coreApi.transaction.notification(req.body);
    const data = {
      order_id: notif.order_id,
      response_midtrans: JSON.stringify(notif.response_midtrans)
    };
    await paymentModel.updateStatus(data);
    const result = await paymentModel.getPaymentByOrder(data.order_id);
    return response(res, 'Payment success', result[0]);
  } catch (e) {
    console.log(e);
    return response(res, e.message, null, 500);
  }
};
