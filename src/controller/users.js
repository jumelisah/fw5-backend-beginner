const usersProfile = require('../models/users');

const getUsers = (req, res)=>{
  usersProfile.getUsers(results=>{
    return res.json({
      success : true,
      message : 'Users list',
      results : results
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
        message: 'User not found'
      });
    }
  });
};

const checkContact = (data, cb, callOne, res)=>{
  const contact = [data[1], data[3]];
  usersProfile.checkContact(contact, result=>{
    if(result.length<1){
      callOne(data, cb);
    }else{
      return res.status(400).send({
        success: false,
        message: 'Email or phone number has been used'
      });
    }
  });
};

const addUser = (req, res)=>{
  const data = [req.body.name, req.body.email, req.body.password, req.body.phone_number, req.body.gender, req.body.birthdate, req.body.address];
  const cb = (result)=>{
    return res.json({
      success: true,
      message: 'User added',
      result: `Rows Affected : ${result.affectedRows}`
    });
  };
  checkContact(data, cb, usersProfile.addUser, res);
};

const updateUser = (req, res)=>{
  const data = [req.body.name, req.body.email, req.body.password, req.body.phone_number, req.body.gender, req.body.birthdate, req.body.address, req.params.id];
  const cb = (result)=>{
    return res.send({
      success: true,
      message: 'Success update data',
      result: `Rows affected : ${result.affectedRows}`
    });
  };
  let a = usersProfile.updateUser(data, cb);
  usersProfile.getUser(data[7], results=>{
    if(results.length>0){
      console.log(results[0]);
      if(results[0].email===data[1] && results[0].phone_number===data[3]){
        return a;
      }else{
        const contact = [data[1], data[3]];
        if(results[0].email===data[1]){
          contact[0] = '';
        }else if(results[0].phone_number===data[3]){
          contact[1]= '';
        }
        console.log(contact);
        usersProfile.checkContact(contact, result=>{
          if(result<0){
            return a;
          }else{
            return res.send({
              success: false,
              message: 'Email or phone number has been used'
            });
          }
        });
      }
    }
  });
};

const deleteUser = (req,res)=>{
  const {id} = req.params;
  usersProfile.getUser(id, results=>{
    if(results.length>0){
      usersProfile.deleteUser(id, result=>{
        return res.json({
          success: true,
          message: 'User was deleted',
          result: `Rows affected: ${result.affectedRows}`
        });
      });
    }else{
      return res.status(404).send({
        success: false,
        message: 'User not found'
      });
    }
  });
};
module.exports = {getUsers, getUser, addUser, updateUser, deleteUser};