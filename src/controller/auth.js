const response = require('../helpers/response');
const userAuth = require('../models/auth');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {APP_SECRET} = process.env;

exports.login = async (req, res)=>{
  const {username, password} = req.body;
  const checkUser = await userAuth.getUsername(username);
  if(checkUser.length===1){
    const data = {id:checkUser[0].id};
    if(checkUser[0].role==='admin'){
      data.role = 'admin';
    }
    const {password:hash} = checkUser[0];
    const passwordCompare = await bcrypt.compare(password, hash);
    if(passwordCompare){
      const token = jwt.sign(data, APP_SECRET);
      return response(res, 'Login success', {token});
    }else{
      return response(res, 'Wrong password', null, 400);
    }
  }else{
    return response(res, 'Username or email not registered', null, 400);
  }
};

exports.verify = (req, res)=>{
  return response(res, 'Success', {headers: req.headers});
};