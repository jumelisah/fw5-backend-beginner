const db = require('../helpers/db');

exports.getReport = (status) => {
  return new Promise((resolve, reject) => {
    db.query('SELECT COUNT(*) as total FROM histories WHERE status=?', [status], (err, res) => {
      if(err) reject(err);
      resolve(res);
    });
  });
};

exports.getAvail = () => {
  return new Promise((resolve, reject) => {
    db.query('SELECT COUNT(*) as total FROM vehicles WHERE qty > 0', (err, res) => {
      if(err) reject(err);
      resolve(res);
    });
  });
};