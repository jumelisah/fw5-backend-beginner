const usersProfile = require('../models/usersasync');
const bcrypt = require('bcrypt');
const response = require('../helpers/response');

exports.getUsers = async(req, res)=>{
  const result = await usersProfile.getUsers();
  if(result.length>0){
    return response(res, 'List of users', result[0]);
  }else{
    return response(res, 'No data found', null);
  }
};

exports.getUser = async(req, res)=>{
  const {id} = req.params;
  const resultId = await usersProfile.getUser(id);
  if(resultId.length>0){
    return response(res, 'User detail', resultId[0]);
  }else{
    return response(res, 'User not found', null, 404);
  }
};

exports.createUser = async(req, res)=>{
  const {name, username, email, password: rawPassword, phone_number, gender, birthdate, address} = req.body;
  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(rawPassword, salt);
  const data = {name, username, email, password, phone_number, gender, birthdate, address};
  const result = await usersProfile.createUser(data);
  const resultId = await usersProfile.getUserId(result.insertId);
  if(result.affectedRows>0){
    return response(res, 'Successfully add user', resultId);
  }
};