const db = require('../helpers/db');

exports.getCategories = (cb)=>{
  db.query('SELECT * FROM categories', (err, res)=>{
    if(err) throw err;
    cb(res);
  });
};

exports.getCategory = (id, cb)=>{
  db.query('SELECT * FROM categories WHERE id =?', [id], (err,res)=>{
    if(err) throw err;
    cb(res);
  });
};

exports.checkCategory = (category, cb)=>{
  db.query('SELECT * FROM categories WHERE category=?', [category], (err, res)=>{
    if(err) throw err;
    cb(res);
  });
};

exports.addCategory = (category, cb)=>{
  db.query('INSERT INTO categories (category) VALUES (?)', [category], (err,res)=>{
    if(err) throw err;
    cb(res);
  });
};

exports.updateCategory = (data, cb)=>{
  db.query('UPDATE categories SET category=? WHERE id=?', data, (err, res)=>{
    if(err) throw err;
    cb(res);
  });
};

exports.deleteCategory = (id, cb)=>{
  db.query(`DELETE FROM categories WHERE id=${id}`, (err, res)=>{
    if(err) throw err;
    cb(res);
  });
};