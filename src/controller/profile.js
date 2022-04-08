const checkDataType = require('../helpers/dataType');
const { isDate } = require('../helpers/dateValidator');
const { deleteImage, cloudPath } = require('../helpers/deleteImage');
const isEmail = require('../helpers/emailvalidator');
const response = require('../helpers/response');
const prof = require('../models/profile');
const usersProfile = require('../models/users');

const getProfile = async (req, res)=>{
  try {
    const id = req.user.id;
    prof.getProfile(id, result=>{
      if(result.length>0){
        return res.json({
          success: true,
          message: 'User profile',
          result: result[0]
        });
      }else{
        return res.status(404).send({
          success: false,
          message: `User with ID: ${id} not found`
        });
      }
    });
  } catch {
    return response(res, 'Unexpected error', null, 500);
  }
};

const editProfile = async (req, res) => {
  try {
    const {id} = req.user;
    console.log(id);
    // const {name, username, email, role, phone_number, gender, birthdate, address} = req.body;
    let image ='';
    console.log(req.files);
    if (req.files.length > 0) {
      image = req.files[0].path;
    }
    console.log(req.files);
    const dataName = ['name', 'username', 'email', 'password', 'role', 'phone_number', 'gender', 'birthdate', 'address'];
    const resultId = await usersProfile.getUser(id);
    const data = {image};
    if (data.image === '') {
      data.image = resultId[0].image;
    }
    console.log(req.body.name);
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
  } catch {
    return response(res, 'Unexpected error', null, 500);
  }
};

module.exports = {getProfile, editProfile};