const usersProfile = require('../models/users');

const getUsers = (req, res)=>{
  usersProfile.getUsers(results=>{
    return res.json({
      success : true,
      message : 'Users list',
      result : results
    });
  });
};

const getUser = (req, res)=>{
  const {id} = req.params;
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

const addUser = (req, res)=>{
  const {name, email, password, phone_number, gender, birthdate, address} = req.body;
  const data = [name, email, password, phone_number, gender, birthdate, address];
  let b = isNull(data);
  if(b<1){
    usersProfile.checkEmail(data[1], results=>{
      if(results.length<1){
        usersProfile.checkPhone(data[3], result=>{
          if(result.length<1){
            return res.json({
              success: true,
              message: 'User was added'
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
      message: 'Please fill all column'
    });
  }
};

const updateUser = (req, res)=>{
  const {id} = req.params;
  const {name, email, password, phone_number, gender, birthdate, address} = req.body;
  const data = [name, email, password, phone_number, gender, birthdate, address, id];
  const cb = (ress)=>{
    return res.json({
      success: true,
      message: 'Success update user',
      result: ress.affectedRows
    });
  };
  let b = isNull(data);
  if(b<1){
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
      message: 'ID undefined'
    });}
};

module.exports = {getUsers, getUser, addUser, updateUser, deleteUser};