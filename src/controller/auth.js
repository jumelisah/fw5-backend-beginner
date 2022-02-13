const response = require('../helpers/response');
const userAuth = require('../models/auth');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mail = require('../helpers/mail');
const { changeDate } = require('../helpers/dateValidator');
const {APP_SECRET, APP_EMAIL} = process.env;

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

exports.forgotPassword = async(req, res)=>{
  const {username, confirmCode, password, confirmPassword} = req.body;
  if(username==null || username==undefined || username==''){
    return response(res, 'Please input your username or email', null, 400);
  }
  const getUser = await userAuth.getUsername(username);
  if(getUser.length<1){
    return response(res, 'Username or email not registered', null, 404);
  }
  if(confirmCode){
    const checkCode = await userAuth.codeCompare(confirmCode);
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
            const changeResult = await userAuth.updatePassword(hash, checkCode[idx].user_id);
            if(changeResult.affectedRows>0){
              const changeStat = await userAuth.updateReqPassword(checkCode[idx].id);
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
  const expired_date = changeDate(date);
  const randomCode = Math.abs(Math.round(Math.random()*(999999-100000)+100000));
  const data = {
    user_id : getUser[0].id,
    code: randomCode,
    expired_date
  };
  const addRequest = await userAuth.requestPassword(data);
  if(addRequest.affectedRows>0){
    const info = await mail.sendMail({
      from: APP_EMAIL,
      to: getUser[0].email,
      subject: 'Reset Password Request | Backend Beginner',
      text: String(randomCode),
      html: `Here's the code you need to reset your password: <b>${randomCode}</b>`
    });
    if(info.length>0){
      return response(res, 'Please check your email. We\'ve sent confirmation code.', null);
    }else{
      return response(res, 'Error: Can\'t send confirmation code', null, 500);
    }
  }else{
    return response(res, 'Error: Can\'t get confirmation code', null, 500);
  }
};