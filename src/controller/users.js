const usersProfile = require('../models/users');
const bcrypt = require('bcrypt');
const response = require('../helpers/response');
const isEmail = require('../helpers/emailvalidator');
const isNull = require('../helpers/isNull');
const checkDataType = require('../helpers/dataType');
const isDate = require('../helpers/dateValidator');

exports.getUsers = async(req, res)=>{
  if(req.user.role==='admin'){
    const result = await usersProfile.getUsers();
    if(result.length>0){
      return response(res, 'List of users', result[0]);
    }else{
      return response(res, 'No data found', null);
    }
  }else{
    return response(res, 'You are not allow to see this page', null, 403);
  }
};

exports.getUser = async(req, res)=>{
  if(req.user.role=='admin'){
    const {id} = req.params;
    const resultId = await usersProfile.getUser(id);
    if(resultId.length>0){
      return response(res, 'User detail', resultId[0]);
    }else{
      return response(res, 'User not found', null, 404);
    }
  }else{
    return response(res, 'You are not allow to see this page', null, 403);
  }
};

exports.createUser = async(req, res)=>{
  const {name, username, email, password: rawPassword} = req.body;
  try{
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(rawPassword, salt);
    const data = {name, username, email, password};
    const dataName = ['name', 'username', 'email', 'password'];
    const itsNull = isNull(data, dataName);
    if(itsNull){
      return response(res, 'Please fill in all the fields.', null, 400);
    }
  
    if(!isNaN(name)){
      return response(res, 'Name should be a STRING!', null, 400);
    }
  
    const itsEmail = isEmail(email);
    if(itsEmail){
      const checkUname = await usersProfile.getUserUname(username);
      console.log(checkUname);
      if(checkUname.length>0){
        return response(res, 'Username not available', null, 400);
      }
  
      const checkEmail = await usersProfile.getEmail(email);
      if(checkEmail.length>0){
        return response(res, 'Email has been used', null, 400);
      }
  
      const addResult = await usersProfile.createUser(data);
      if(addResult.affectedRows>0){
        const newUserResult = await usersProfile.getUser(addResult.insertId);
        if(newUserResult.length>0){
          return response(res, 'Successfully register a new user', newUserResult[0]);
        }else{
          return response(res, 'Error: Can\'t get new user data', null, 500);
        }
      }else{
        return response(res, 'Error: Can\'t add user', null, 500);
      }
    }else{
      return response(res, 'Wrong email format!', null, 400);
    }
  }catch(err){
    return response(res, 'Input the password!', null, 400);
  }
};

exports.updateUser = async(req, res)=>{
  const {id} = req.params;
  const data = {};
  const dataName = ['name', 'username', 'email', 'password', 'role', 'phone_number', 'gender', 'birthdate', 'address'];
  dataName.forEach(x=>{
    if(req.body[x]){
      data[x] = req.body[x];
    }
  });
  if(req.body.role){
    if(req.user.role!=='admin'){
      return response(res, 'You are not allow to add user role', null, 403);
    }
  }
  if(req.user.id==id){
    if(id==null || id==undefined || id==''){
      return response(res, 'Undefined ID', null, 400);
    }
    if(id>0){
      const resultId = await usersProfile.getUser(id);
      if(resultId.length>0){
        const checkType = checkDataType(data, ['phone_number'], ['name']);
        if(checkType.length>0){
          return response(res, checkType, null, 400);
        }
        if(data.password){
          if(data.password.length>=6){
            const salt = await bcrypt.genSalt(10);
            const password = await bcrypt.hash(data.password, salt);
            data.password = password;
          }else{
            return response(res, 'Password should contain 6 characters and more', null, 400);
          }
        }
      
        if(data.email){
          const itsEmail = isEmail(data.email);
          if(!itsEmail){
            return response(res, 'Wrong email format!', null, 400);
          }
          const checkEmail = await usersProfile.getEmail(data.email);
          if(checkEmail.length>0 && id!=checkEmail[0].id){
            return response(res, 'Email has been used', null, 400);
          }
        }
        if(data.phone_number){
          if(data.phone_number.length<10 || data.phone_number.length>13){
            return response(res, 'Phone number length should be between 10-13 numbers', null, 400);
          }
          const checkPhone = await usersProfile.getPhone(data.phone_number);
          if(checkPhone.length>0 && id!=checkPhone[0].id){
            return response(res, 'Phone number has been used', null, 400);
          }
        }
        if(data.username){
          const checkUname = await usersProfile.getUserUname(data.username);
          if(checkUname.length>0 && id!=checkUname[0].id){
            return response(res, 'Username not available', null, 400);
          }
        }
        if(data.birthdate){
          const itsDate = isDate(data.birthdate);
          if(itsDate!=='Invalid Date'){
            data.birthdate = itsDate;
          }else{
            return response(res, 'Invalid date format', null, 400);
          }
        }
        const resultUpdate = await usersProfile.updateUser(data, id);
        if(resultUpdate.affectedRows>0){
          const resultUpdateUser = await usersProfile.getUser(id);
          if(resultUpdateUser.length===1){
            return response(res, 'Successfully update user data', resultUpdateUser[0]);
          }else{
            return response(res, 'Error: Can\'t get updated data', null, 500);
          }
        }else{
          return response(res, 'Error: Can\'t update user', null, 500);
        }
      }else{
        return response(res, 'User not found', null, 400);
      }
    }else{
      return response(res, 'ID should be a number greater than 0');
    }
  }else{
    return response(res, 'Unmatch ID', null, 403);
  }
};

exports.deleteUser = async(req, res)=>{
  const {id} = req.params;
  if(req.user.id==id){
    if(id==null || id==undefined || id==''){
      return response(res, 'Undefined ID', null, 400);
    }
    if(id>0){
      const resultId = await usersProfile.getUser(id);
      if(resultId.length>0){
        const deleteResult = await usersProfile.deleteUser(id);
        if(deleteResult.affectedRows>0){
          return response(res, 'Successfully deleted user', resultId[0]);
        }
      }else{
        return response(res, 'User not found', null, 400);
      }
    }else{
      return response(res, 'ID should be a number greater than 0');
    }
  }else{
    return response(res, 'Unmatch ID', null, 403);
  }
};