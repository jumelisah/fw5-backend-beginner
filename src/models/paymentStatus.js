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

exports.getPaymentByOrder = (order_id) => new Promise((resolve, reject) => {
  db.query(`SELECT * FROM payment_status WHERE order_id=${order_id}`, (err, res) => {
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

exports.updateStatus = (data) => new Promise ((resolve, reject) => {
  db.query(`UPDATE payment_status SET response_midtrans='${data.response_midtrans}' WHERE order_id=${data.order_id}`, (err, res) => {
    if(err) reject(err);
    resolve(res);
  });
});
