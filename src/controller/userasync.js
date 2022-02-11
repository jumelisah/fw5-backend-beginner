const usersasync = require('../models/usersasync');
const bcrypt = require('bcrypt');
const response = require('../helpers/response');

exports.createUser = async(req, res)=>{
  const {name, username, email, password: rawPassword, phone_number, gender, birthdate, address} = req.body;
  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(rawPassword, salt);
  const data = {name, username, email, password, phone_number, gender, birthdate, address};
  const result = await usersasync.createUser(data);
  const resultId = await usersasync.getUserId(result.insertId);
  if(result.affectedRows>0){
    return response(res, 'Successfully add user', resultId);
  }
};