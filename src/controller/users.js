const usersProfile = require('../models/users');
const {APP_URL} = process.env;
const upload = require('../helpers/upload').single('image');

const getUsers = (req, res)=>{
  let {name, gender, page, limit} = req.query;
  name = name || '';
  gender = parseInt(gender) || 0;
  page = parseInt(page) || 1;
  limit = parseInt(limit) || 5;

  let offset = (page-1)*limit;
  const data = {name, gender, page, limit, offset};
  if(limit<0){
    return res.status(400).send({
      success: false,
      message: 'limit should be more than 0'
    });
  }if(page<0){
    return res.status(400).send({
      success: false,
      message: 'page should be more than 0'
    });
  }
  if(gender>0){
    if(gender<3){
      usersProfile.getGender(data, results=>{
        if(results.length>0){
          return res.json({
            success : true,
            message : 'Users list',
            result : results
          });
        }else{
          return res.status(404).send({
            success: false,
            message: 'Users not found'
          });
        }
      });
    }else{
      return res.status(400).send({
        success: false,
        message: 'Gender should be 1 for male or 2 for female'
      });
    }
  }else{
    usersProfile.getUsers(data, result=>{
      return res.json({
        success: true,
        message: 'User list',
        result: result
      });
    });
  }
};

const getUser = (req, res)=>{
  let {id} = req.params;
  id = id || 0;
  if(id>0){
    usersProfile.getUser(id, result=>{
      if(result.length>0){
        return res.json({
          success: true,
          message: 'User found',
          result : result[0]
        });
      }else{
        return res.status(404).send({
          success: false,
          message: `User with ID: ${id} not found`
        });
      }
    });
  }else{
    return res.send({
      success: false,
      message: 'ID must be a number greater than 0'
    });
  }
};

const isNull = (data)=>{
  let a = 0;
  for(let i=0; i<data.length;i++){
    if(data[i]==''){
      a++;
    }
  }
  return a;
};

const isEmail = (email)=>{
  let a = email.split('');
  let b = a.filter(x => x=='@').length;
  let c = a.filter(x => x=='.').length;
  let d = a.findIndex(x => x=='@');
  let e = a.findIndex(x => x=='.');
  if(b==1 && c==1 && e>d+1){
    return true;
  }else{
    return false;
  }
};

const isMatch = (data)=>{
  const dataName = ['name', 'email', 'password', 'phone_number', 'gender', 'birthdate', 'address'];
  let theType = ['isNaN', 'email', 'isNaN', 'number', 'number', 'date', 'isNaN'];
  const newData = [];
  const dataError = [];
  for(let i=0; i<dataName.length;i++){
    newData.push(parseInt(data[i]));
    if(theType[i]=='isNaN' && i!=2){
      if(isNaN(newData[i])==false){
        dataError.push(`${dataName[i]} must be a string`);
      }
    }else if(theType[i]=='email'){
      let a = isEmail(data[1]);
      if(a==false){
        dataError.push('Email should be in format : username@email.com');
      }
    }else if(theType[i]=='date'){
      let a = new Date(data[5]);
      if(a=='Invalid Date'){
        dataError.push('Birthdate must in format yyyy-mm-dd');
      }
    }else if(theType[i]=='number'){
      if(isNaN(newData[i])==true){
        dataError.push(`${dataName[i]} must be a number`);
      }
    }
  }
  return dataError;
};

const editData = (data, cb, callback, res)=>{
  let a = isNull(data);
  let b = isMatch(data);
  if(a<1){
    if(b.length<1){
      usersProfile.checkEmail(data[1], result=>{
        if(result.length<1){
          usersProfile.checkPhone(data[3], results=>{
            if(results.length<1 || results[0].id==data[7]){
              callback(data, cb);
            }else{
              return res.status(400).send({
                success: false,
                message: 'Phone number has been used'
              });
            }
          });
        }else if(result.length<=1 && result[0].id==data[7]){
          usersProfile.checkPhone(data[3], results=>{
            if(results.length<1 || results[0].id==data[7]){
              callback(data, cb);
            }else{
              console.log(results[0]);
              return res.status(400).send({
                success: false,
                message: 'Phone number has been used'
              });
            }
          });
        }else{
          return res.status(400).send({
            success: false,
            message: 'Email has been used'
          });
        }
      });
    }else{
      return res.status(400).send({
        success: false,
        message: b
      });
    }
  }else{
    return res.status(400).send({
      success: false,
      message: 'Please fill in all the fields'
    });
  }
};

const addUser = (req, res)=>{
  upload(req, res, err=>{
    if(err){
      return res.json({
        success: false,
        message: err.message
      });
    }else{
      const {name, email, phone_number} = req.body;
      let image = '';
      if(req.file){
        image = `${APP_URL}/${req.file.path}`;
      }else{
        image = 'http://localhost:8000/uploads\\default-avatar.jpg';
      }
      const data = {name, image, email, phone_number};
      usersProfile.checkEmail(email, resultEmail=>{
        if(resultEmail.length<1){
          usersProfile.checkPhone(phone_number, resPhone=>{
            if(resPhone<1){
              usersProfile.addUser(data, result=>{
                usersProfile.getUser(result.insertId, resultId=>{
                  return res.json({
                    success: true,
                    message: 'Success',
                    result: resultId[0]
                  });
                });
              });
            }else{
              return res.status(400).send({
                success: false,
                message: 'Phone number has been used.'
              })
            }
          })
        }else{
          return res.status(400).send({
            success: false,
            message: 'Email has been used'
          });
        }
      });
    }
  });
};

const updateUser = (req, res)=>{
  const {id} = req.params;
  const {name, email, password, phone_number, gender, birthdate, address} = req.body;
  const data = [name, email, password, phone_number, gender, birthdate, address, id];
  const cb = (ress)=>{
    usersProfile.getUser(id, resId=>{
      return res.json({
        success: true,
        message: `Success update user.Rows Affected : ${ress.affectedRows}`,
        result: resId[0]
      });
    });
  };
  if(id==null || id==undefined){
    return res.status(400).send({
      success: false,
      message: 'Undefined ID'
    });
  }if(id>0){
    usersProfile.getUser(id, result=>{
      if(result.length>0){
        editData(data, cb, usersProfile.updateUser, res);
      }else{
        return res.status(404).send({
          success: false,
          message: `User with ID: ${id} not found`
        });
      }
    });
  }else{
    return res.status(400).send({
      success: false,
      message: 'ID shoulb be a number greater than 0'
    });
  }
};

const deleteUser = (req,res)=>{
  const {id} = req.params;
  if(id==null || id==undefined){
    return res.status(400).send({
      success: false,
      message: 'Undefined ID'
    });
  }
  if(id>0){
    usersProfile.getUser(id, results=>{
      if(results.length>0){
        usersProfile.deleteUser(id, result=>{
          return res.json({
            success: true,
            message: `User with ID: ${id} was deleted`,
            result: `Rows affected: ${result.affectedRows}`
          });
        });
      }else{
        return res.status(404).send({
          success: false,
          message: `User with ID: ${id} not found`
        });
      }
    });
  }else{
    return res.status(400).send({
      success: false,
      message: 'ID should be a number greater than 0'
    });}
};

module.exports = {getUsers, getUser, addUser, updateUser, deleteUser};