const db = require('../helpers/db');

exports.getPayment = () => new Promise((resolve, reject) => {
  db.query('SELECT * FROM payment_status', (err, res) => {
    if (err) reject(err);
    resolve(res);
  });
});

exports.getPaymentByID = (id) => new Promise((resolve, reject) => {
  db.query(`SELECT * FROM payment_status WHERE id=${id}`, (err, res) => {
    if (err) reject(err);
    resolve(res);
  });
});

exports.createPaymentStatus = (data) => new Promise((resolve, reject) => {
  db.query(`INSERT INTO payment_status (order_id, gross_amount, name, response_midtrans) VALUES(${data.order_id}, ${data.gross_amount}, '${data.name}', '${data.response_midtrans}')`, (err, res) =>{
    if (err) reject (err);
    resolve(res);
  });
});
