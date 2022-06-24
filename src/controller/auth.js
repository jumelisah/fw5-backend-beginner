const response = require('../helpers/response');
const userAuth = require('../models/auth');
const userModel = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mail = require('../helpers/mail');
const { changeDate, isLessThan } = require('../helpers/dateValidator');
const isEmail = require('../helpers/emailvalidator');
const {APP_SECRET, APP_EMAIL} = process.env;

exports.login = async (req, res)=>{
  try{
    const {username, password} = req.body;
    const checkUser = await userAuth.getUsername(username);
    if(checkUser.length===1){
      // if(checkUser[0].is_confirmed===0){
      //   return response(res, 'Please confirm your account with code we\'ve sent to your email', null, 400);
      // }
      const data = {id:checkUser[0].id};
      if(checkUser[0].role=='Admin' || checkUser[0].role=='admin'){
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
  } catch {
    return response(res, 'Unexpected error', null, 500);
  }
};

exports.changePassword = async (req, res) => {
  try{
    const {password, newPassword, repeatPassword} = req.body;
    if(newPassword!==repeatPassword){
      return response(res, 'Password not match', null, 400);
    }
    const user = await userModel.getUser(req.user.id);
    const {password:hash} = user[0];
    const passwordCompare = await bcrypt.compare(password, hash);
    if(!passwordCompare){
      return response(res, 'Wrong Password', null, 400);
    }
    const salt = await bcrypt.genSalt(10);
    const setNewPassword = await bcrypt.hash(newPassword, salt);
    const data = {password: setNewPassword};
    const editPassword = await userModel.updateUser(data, req.user.id);
    if(editPassword.affectedRows < 1) {
      return response(res, 'Unexpected error', null, 500);
    }
    return response(res, 'Password has been changed');
  } catch {
    return response(res, 'Unexpected error', null, 500);
  }
};

exports.forgotPassword = async(req, res)=>{
  try{
    const {username, confirmCode, password, confirmPassword} = req.body;
    if(username==null || username==undefined || username==''){
      return response(res, 'Please input your username or email', null, 400);
    }
    const getUser = await userAuth.getUsername(username);
    if(getUser.length<1){
      return response(res, 'Username or email not registered', null, 404);
    }
    const user_id = getUser[0].id;
    if(confirmCode){
      const checkCode = await userAuth.codeCompare(confirmCode, user_id);
      if(checkCode.length<1){
        return response(res, 'You don\'t have confirmation code');
      }
      let idx = checkCode.findIndex(x=>x.user_id===getUser[0].id);
      if(idx>=0){
        if(checkCode[idx].status==0){
          return response(res, 'Code has been used', null, 400);
        }else{
          const timeNow = new Date().getTime();
          const expTime = checkCode[idx].expired_date.getTime();
          if(timeNow<expTime){
            if(password===confirmPassword){
              const salt = await bcrypt.genSalt(10);
              const hash = await bcrypt.hash(password, salt);
              console.log('satu', hash);
              const changeResult = await userAuth.updatePassword(hash, checkCode[idx].user_id);
              console.log('dua', changeResult);
              if(changeResult.affectedRows>0){
                const changeStat = await userAuth.updateReqCode(checkCode[idx].id);
                console.log('tiga', changeStat);
                if(changeStat.affectedRows>0){
                  return response(res, 'Password was changed', null);
                }else{
                  return response(res, 'Error: Can\'t change password');
                }
              }else{
                return response(res, 'Error: Can\'t change password', null, 500);
              }
            }else{
              return response(res, 'Password not match', null, 400);
            }
          }else{
            return response(res, 'Code expired', null, 400);
          }
        }
      }else{
        return response(res, 'Code not match', null, 400);
      }

    }
    const date = new Date();
    const expired_date = changeDate(date, 2);
    const randomCode = Math.abs(Math.round(Math.random()*(999999-100000)+100000));
    const data = {
      user_id,
      code: randomCode,
      expired_date,
      type: 1
    };
    const addRequest = await userAuth.requestCode(data);
    if(addRequest.affectedRows>0){
      const info = await mail.sendMail({
        from: APP_EMAIL,
        to: getUser[0].email,
        subject: 'Reset Password Request | Backend Beginner',
        text: String(randomCode),
        html: `Here's the code you need to reset your password: <b>${randomCode}</b>`
      });
      if(info){
        return response(res, 'Please check your email. We\'ve sent confirmation code.', null);
      }else{
        return response(res, 'Error: Can\'t send confirmation code', null, 500);
      }
    }else{
      return response(res, 'Error: Can\'t get confirmation code', null, 500);
    }
  } catch {
    return response(res, 'Unexpected error', null, 500);
  }
};

exports.confirmAccount = async(req, res)=>{
  try{
    const {email, code} = req.body;
    if(!email){
      return response(res, 'input your email!', null, 400);
    }
    if(!code){
      return response(res, 'Input confirmation code!', null, 400);
    }
    const itsEmail = isEmail(email);
    if(!itsEmail){
      return response(res, 'Invalid email address', null, 400);
    }
    const getUser = await userAuth.getUsername(email);
    if(getUser.length<1){
      return response(res, 'Email not register.', null, 400);
    }
    const user_id = getUser[0].id;
    const checkCode = await userAuth.codeCompare(code, user_id);
    if(checkCode.length<1){
      return response(res, 'Not match code', null, 400);
    }
    const code_id = checkCode[0].id;
    if(checkCode[0].status==0){
      return response(res, 'Account has been confirmed.', null, 400);
    }
    const itsLessThan = isLessThan(new Date(), checkCode[0].expired_date);
    if(!itsLessThan){
      const date = new Date();
      const expired_date = changeDate(date, 10);
      const randomCode = Math.abs(Math.round(Math.random()*(999999-100000)+100000));
      const codeData = {
        user_id,
        code: randomCode,
        expired_date,
        type: 2
      };
      const newCode = await userAuth.requestCode(codeData);
      if(newCode.affectedRows<1){
        return response(res, 'Unexpected error: Can\'t send a new code', null, 500);
      }
      const info = await mail.sendMail({
        from: APP_EMAIL,
        to: email,
        subject: 'New Confirmation Code | Backend Beginner',
        text: String(randomCode),
        html: `Here's the new code you need to confirm your account: <b>${randomCode}</b>`
      });
      if(info){
        return response(res, 'Code expired! We\'ve send a new code', null, 400);
      }else{
        return response(res, 'Unexpected error', null, 500);
      }
    }
    const updateStatCode = await userAuth.updateReqCode(code_id);
    if(updateStatCode.affectedRows<1){
      return response(res, 'Unexpected error: Can\'t change status code', null, 500);
    }
    const changeStat = await userAuth.statusConfirm(user_id);
    if(changeStat.affectedRows<1){
      return response(res, 'Unexpected error: Can\'t change confirmation status', null, 500);
    }
    return response(res, 'Thanks for confirm your account', null);
  } catch {
    return response(res, 'Unexpected error', null, 500);
  }
};