const usersProfile = require('../models/users');

const getUsers = (req, res)=>{
  let {name, page, limit} = req.query;
  name = name || '';
  page = parseInt(page) || 1;
  limit = parseInt(limit) || 5;

  let offset = (page-1)*limit;
  const data = {name, page, limit, offset};
  usersProfile.getUsers(data, results=>{
    return res.json({
      success : true,
      message : 'Users list',
      result : results
    });
  });
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
          message: `User with ID: ${id} was not found`
        });
      }
    });
  }else{
    return res.send({
      success: false,
      message: 'Please input the ID'
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

const checkType = (data)=>{
  const dataName = ['name', 'email', 'password', 'phone_number', 'gender', 'birthdate', 'address'];
  const dataType = ['isNaN', 'isNaN', 'isNaN', 'number', 'isNaN', 'number', 'isNaN'];
  const throwData = [];
  const dataError = [];
  for(let i=0; i<data.length;i++){
    throwData.push(parseInt(data[i]));
  }
  for(let j=0; j<throwData.length;j++){
    if(dataType[j]=='isNaN'){
      if(j!==2){
        if(isNaN(throwData[j])==false){
          dataError.push(`${dataName[j]} must be STRING`);
        }
      }
    }else{
      if(typeof throwData[j]!=='number'){
        dataError.push(`${dataName[j]} must be NUMBER`);
      }
    }
  }
  return dataError;
};

const addUser = (req, res)=>{
  const {name, email, password, phone_number, gender, birthdate, address} = req.body;
  const data = [name, email, password, phone_number, gender, birthdate, address];
  let b = isNull(data);
  let c = checkType(data);
  if(b<1){
    if(c.length<1){
      usersProfile.checkEmail(data[1], results=>{
        if(results.length<1){
          usersProfile.checkPhone(data[3], result=>{
            if(result.length<1){
              usersProfile.addUser(data, ress=>{
                usersProfile.checkEmail(email, resEmail=>{
                  return res.json({
                    success: true,
                    message: `User was added. Rows Affected: ${ress.affectedRows}`,
                    result: resEmail[0]
                  });
                });
              });
            }else{
              return res.status(403).send({
                success: false,
                message: 'Phone number has been used'
              });
            }
          });
        }else{
          return res.status(403).send({
            success: false,
            message: 'Email has been used'
          });
        }
      });

    }else{
      return res.status(400).send({
        success: false,
        message: c
      });
    }
  }else{
    return res.status(400).send({
      success: false,
      message: 'Please fill all column'
    });
  }
};

const updateUser = (req, res)=>{
  const {id} = req.params;
  const {name, email, password, phone_number, gender, birthdate, address} = req.body;
  const data = [name, email, password, phone_number, gender, birthdate, address, id];
  const cb = (ress)=>{
    usersProfile.getUser(id, resId=>{
      return res.json({
        success: true,
        message: `Success update user. Affected Rows: ${ress.affectedRows}`,
        result: resId
      });
    });
  };
  let b = isNull(data);
  let c = checkType(data);
  if(b<1){
    if(c.length<1){
      usersProfile.checkEmail(email, results=>{
        if(results.length>=1){
          if(results[0].id==id){
            usersProfile.checkPhone(phone_number, result=>{
              if(result.length>=1){
                if(result[0].id==id){
                  usersProfile.updateUser(data, cb);
                }else{
                  return res.status(400).send({
                    success: false,
                    message: 'Phone number has been used'
                  });
                }
              }else{
                usersProfile.updateUser(data, cb);
              }
            });
          }else{
            return res.status(400).send({
              success: false,
              message: 'Email has been used'
            });
          }
        }else{
          usersProfile.updateUser(data, cb);
        }
      });
    }else{
      return res.status(400).send({
        success: false,
        message: c
      });
    }
  }else{
    return res.status(400).send({
      success: false,
      message: 'Please fill all columns'
    });
  }
};

const deleteUser = (req,res)=>{
  const {id} = req.params;
  if(id!==null && id!==undefined){
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
      message: 'Undefined ID'
    });}
};

module.exports = {getUsers, getUser, addUser, updateUser, deleteUser};