const db = require('../helpers/db');

exports.getUsers = (cb)=>{
    db.query('SELECT * FROM users', (err,res)=>{
        if(err) throw err;
        cb(res);
    });
};

exports.getUser = (id, cb)=>{
    db.query('SELECT * FROM users WHERE id =?', [id], (err, res)=>{
        if(err) throw err;
        cb(res);
    });
};

exports.checkEmail = (email, cb)=>{
    db.query('SELECT * FROM users WHERE email=?', [email], (err, res)=>{
        if(err) throw err;
        cb(res);
    });
};

exports.addUser = (data, cb)=>{
    db.query('INSERT INTO users (name, email, password, phone_number, gender, birthdate, address) VALUES(?,?,?,?,?,?,?)', data, (err, res)=>{
        if(err) throw err;
        cb(res);
    });
};