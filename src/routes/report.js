const { checkStatusCar } = require('../controller/histasync');
const { getReport } = require('../controller/report');

const report = require('express').Router();

report.get('/', getReport);
report.get('/:status', checkStatusCar);

module.exports = report;
