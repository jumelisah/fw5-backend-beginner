const response = require('../helpers/response');
const reportAuth = require('../models/report');

const getReport = async(req, res) => {
  try{
    // const status = ['Booked', 'Wait for payment'];
    const data = {};
    const booked = await reportAuth.getReport('Booked');
    const waitPayment = await reportAuth.getReport('Wait for payment');
    const rent = await reportAuth.getReport('Rent');
    data['Booked'] = booked[0].total;
    data['Wait for payment'] = waitPayment[0].total;
    data['Rent'] = rent[0].total;
    const available = await reportAuth.getAvail();
    data['Available'] = available[0].total;
    // status.forEach(async(el) => {
    //   const dataReport = await reportAuth.getReport(el);
    //   console.log(dataReport[0].total);
    //   data[el] = dataReport[0].total;
    //   console.log(data);
    //   return data;
    // });
    return response(res, 'Report Status', data, 200, null);
  } catch(err){
    return response(res, String(err), null, 400, null);
  }
};

module.exports = {getReport};
