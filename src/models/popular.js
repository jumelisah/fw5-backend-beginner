const db = require('../helpers/db');

exports.popularList = (cb)=>{
  db.query('SELECT vehicles.name AS vehicle_name, vehicles.year AS year, vehicles.location AS location, COUNT(*) AS total_rent FROM histories JOIN vehicles ON histories.vehicle_id=vehicles.id GROUP BY vehicle_id ORDER BY COUNT(*) DESC', (err, res)=>{
    if(err) throw err;
    cb(res);
  });
};