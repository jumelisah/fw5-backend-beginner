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
    return response(res, 'Payment status list', results, 200, null);
  } catch (e) {
    return response(res, e, null, 500);
  }
};

exports.getPaymentDetail = async(req, res) => {
  try {
    const result = await paymentModel.getPaymentByID(req.params.id);
    return response(res, 'Payment detail', result[0]);
  } catch (e) {
    return response(res, e, null, 500);
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
      'name': req.body.name,
    };
    const midtransResponse = await coreApi.charge(parameter);
    console.log(midtransResponse);
    const data = {
      order_id: midtransResponse.order_id,
      name: req.body.name,
      gross_amount: midtransResponse.gross_amount,
      response_midtrans: JSON.stringify(midtransResponse)
    };
    const createData = await paymentModel.createPaymentStatus(data);
    const getNewData = await paymentModel.getPaymentByID(createData.insertId);
    return response(res, 'Successfully add new payment', getNewData[0]);
  } catch (e) {
    console.log(e);
    return response(res, e, null, 500);
  }
};
