const usersProfile = require('../models/users');
const authModel = require('../models/auth');
const bcrypt = require('bcrypt');
const {APP_URL, APP_EMAIL} = process.env;
const mail = require('../helpers/mail');
const response = require('../helpers/response');
const isEmail = require('../helpers/emailvalidator');
const isNull = require('../helpers/isNull');
const checkDataType = require('../helpers/dataType');
const {isDate, changeDate} = require('../helpers/dateValidator');
const { deleteImage, cloudPath} = require('../helpers/deleteImage');

exports.getUsers = async(req, res)=>{
  let {name, page, limit} = req.query;
  name = name || '';
  page = parseInt(page) || 1;
  limit = parseInt(limit) || 5;
  const offset = (page-1)*limit;
  const data = {name, page, limit, offset};
  const result = await usersProfile.getUsers(data);
  const totalData = await usersProfile.countData(data);
  let url = `${APP_URL}/users?`;
  if(name!==''){
    url = `${url}name=${name}`;
  }
  const total = totalData[0].total;
  let last = Math.ceil(total/limit);
  const pageInfo = {
    prev : page > 1 ? `${url}page=${page-1}&limit=${limit}` : null,
    next : page < last ? `${url}page=${page+1}&limit=${limit}` : null,
    currentPage : page,
    lastPage: last
  };
  if(result.length>0){
    return response(res, 'List of users', result, 200, pageInfo);
  }else{
    return response(res, 'No data found', null);
  }
};

exports.getUser = async(req, res)=>{
  const {id} = req.params;
  if(req.user.role=='admin' || req.user.id==id){
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
  const {username, email, password: rawPassword, confirmPassword} = req.body;
  const image = 'https://res.cloudinary.com/juumelisa/image/upload/v1648876041/SERAN/uploads/users/default-user_cyzz1x.png';
  console.log(req.body.confirmPassword);
  try{
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(rawPassword, salt);
    const data = {username, email, password, image, name: username};
    const dataName = ['username', 'email', 'password', 'image'];
    const itsNull = isNull(data, dataName);
    if(itsNull){
      return response(res, 'Please fill in all the fields.', null, 400);
    }
  
    // if(!isNaN(name)){
    //   return response(res, 'Name should be a STRING!', null, 400);
    // }
    if(rawPassword!==confirmPassword){
      return response(res, 'Passwords not match', null, 400);
    }
  
    const itsEmail = isEmail(email);
    if(itsEmail){
      const checkEmail = await usersProfile.getEmail(email);
      if(checkEmail.length>0){
        return response(res, 'Email has been used', null, 400);
      }
    }else{
      return response(res, 'Invalid email', null, 400);
    }
    const checkUname = await usersProfile.getUserUname(username);
    if(checkUname.length>0){
      return response(res, 'Username not available', null, 400);
    }

    const addUser = await usersProfile.createUser(data);
    if(addUser.affectedRows<1){
      return response(res, 'Unexpected error: Can\'t register new user', null, 500);
    }
    const date = new Date();
    const expired_date = changeDate(date, 10);
    const randomCode = Math.abs(Math.round(Math.random()*(999999-100000)+100000));
    const codeData = {
      user_id : addUser.insertId,
      code: randomCode,
      expired_date,
      type: 2
    };
    const addConfirmCode = await authModel.requestCode(codeData);
    if(addConfirmCode.affectedRows<1){
      return response(res, 'Unexpected error: Can\'t get confirmation code', null, 500);
    }
    const info = await mail.sendMail({
      from: APP_EMAIL,
      to: email,
      subject: 'Register Confirmation | Backend Beginner',
      text: String(randomCode),
      html: `Here's the code you need to confirm your account: <b>${randomCode}</b>`
    });
    if(info){
      return response(res, 'Register success. We\'ve sent confirmation code to your email.', null);
    }else{
      return response(res, 'Unexpected error: Can\'t send confirmation code', null);
    }
  }catch(err){
    if(req.files){
      deleteImage(cloudPath(req.files[0].filename));
    }
    return response(res, 'Input the password!', null, 400);
  }
};

exports.updateUser = async(req, res)=>{
  try{
    let {id} = req.params;
    if(!id){
      id=req.user.id;
    }
    let image = '';
    const data = {};
    if(req.files){
      image = req.files[0].path;
      data.image = image;
    }
    if(id==null || id==undefined || id==''){
      return response(res, 'Undefined ID', null, 400);
    }
    if(id<=0){
      return response(res, 'ID should be a number greater than 0');
    }
    
    if(req.user.id==id){
      const dataName = ['name', 'username', 'email', 'password', 'role', 'phone_number', 'gender', 'birthdate', 'address'];
  
      const resultId = await usersProfile.getUser(id);
      if(resultId.length>0){
        dataName.forEach(x=>{
          if(req.body[x] && req.body[x]!==''){
            data[x] = req.body[x];
          }else{
            data[x] = resultId[0][x];
          }
        });
        const checkType = checkDataType(data, ['phone_number'], ['name']);
        if(checkType.length>0){
          return response(res, checkType, null, 400);
        }
        if(req.body.password==''){
          if(req.files){
            deleteImage(cloudPath(req.files[0].filename));
          }
          return response(res, 'Please input the password', null, 400);
        }
        if(req.body.password){
          if(req.body.password.length>=6){
            const salt = await bcrypt.genSalt(10);
            const password = await bcrypt.hash(data.password, salt);
            data.password = password;
          }else{
            if(req.files){
              deleteImage(cloudPath(req.files[0].filename));
            }
            return response(res, 'Password should contain 6 characters and more', null, 400);
          }
        }
      
        if(data.email){
          const itsEmail = isEmail(data.email);
          if(!itsEmail){
            if(req.files){
              deleteImage(cloudPath(req.files[0].filename));
            }
            return response(res, 'Wrong email format!', null, 400);
          }
          const checkEmail = await usersProfile.getEmail(data.email);
          if(checkEmail.length>0 && id!=checkEmail[0].id){
            return response(res, 'Email has been used', null, 400);
          }
        }
        if(data.phone_number){
          if(data.phone_number.length<10 || data.phone_number.length>13){
            if(req.files){
              deleteImage(cloudPath(req.files[0].filename));
            }
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
            if(req.files){
              deleteImage(cloudPath(req.files[0].filename));
            }
            return response(res, 'Username not available', null, 400);
          }
        }
        if(req.body.birthdate){
          const itsDate = isDate(req.body.birthdate);
          if(itsDate!=='Invalid Date'){
            data.birthdate = itsDate;
          }else{
            if(req.files){
              deleteImage(cloudPath(req.files[0].filename));
            }
            return response(res, 'Invalid date format', null, 400);
          }
        }
        const resultUpdate = await usersProfile.updateUser(data, id);
        console.log(resultUpdate);
        if(resultUpdate.affectedRows>0){
          const resultUpdateUser = await usersProfile.getUser(id);
          if(resultUpdateUser.length===1){
            return response(res, 'Successfully update user data', resultUpdateUser[0]);
          }else{
            return response(res, 'Error: Can\'t get updated data', null, 500);
          }
        }else{
          if(req.files){
            deleteImage(cloudPath(req.files[0].filename));
          }
          return response(res, 'Error: Can\'t update user', null, 500);
        }
      }else{
        if(req.files){
          deleteImage(cloudPath(req.files[0].filename));
        }
        return response(res, 'User not found', null, 400);
      }
    }else{
      if(req.files){
        deleteImage(cloudPath(req.files[0].filename));
      }
      return response(res, 'Unmatch ID', null, 403);
    }
  } catch (e) {
    if(req.files){
      deleteImage(cloudPath(req.files[0].filename));
    }
    return response(res, 'Error', e, 400);
  }
};

exports.deleteUser = async(req, res)=>{
  try{
    const {id} = req.params;
    if(req.user.id==id){
      if(id==null || id==undefined || id==''){
        return response(res, 'Undefined ID', null, 400);
      }
      if(id>0){
        const resultId = await usersProfile.getUser(id);
        if(resultId.length>0){
          const deleteResult = await usersProfile.deleteUser(id);
          deleteImage(cloudPath(resultId[0].image));
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
  } catch {
    return response(res, 'Unexpected error', null, 500);
  }
};
