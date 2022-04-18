const db = require('../helpers/db');

exports.getLocation = (data) => new Promise((resolve, reject) => {
  db.query(`SELECT * FROM locations WHERE location LIKE '%${data.location}%' LIMIT ${data.limit} OFFSET ${data.offset}`, (err, res)=> {
    if(err) reject(err);
    resolve(res);
  }); 
});

exports.countLocation = (data) => new Promise((resolve, reject) => {
  db.query(`SELECT COUNT(*) AS totalData FROM locations WHERE location LIKE '%${data.location}%'`, (err, res)=> {
    if(err) reject(err);
    resolve(res);
  }); 
});

exports.getLocationById = (id) => new Promise((resolve, reject) => {
  db.query(`SELECT * FROM locations WHERE id=${id}`, (err, res) => {
    if(err) reject(err);
    resolve(res);
  });
});

exports.getLocationByName = (name) => new Promise((resolve, reject) => {
  db.query(`SELECT * FROM locations WHERE location='${name}'`, (err, res) => {
    if(err) reject(err);
    resolve(res);
  });
});

exports.addLocation = (name) => new Promise((resolve, reject) => {
  db.query('INSERT INTO locations (location) VALUES(?)', [name], (err, res) => {
    if(err) reject(err);
    resolve(res);
  });
});

exports.editLocation = (id, location) => new Promise((resolve, reject) => {
  db.query(`UPDATE locations SET location='${location}' WHERE id=${id}`, (err, res) => {
    if(err) reject(err);
    resolve(res);
  });
});

exports.deleteLocation = (id) => new Promise((resolve, reject) => {
  db.query(`DELETE FROM locations WHERE id=${id}`, (err, res) => {
    if(err) reject(err);
    resolve(res);
  });
});
