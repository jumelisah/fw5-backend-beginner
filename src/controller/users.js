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
    }
  });
};

const updateUser = (req, res)=>{
  upload(req, res, err=>{
    if(err){
      return res.json({
        success: false,
        message: err.message
      });
    }
    const {id} = req.params;
    let image = null;
    if(req.file){
      image = `${APP_URL}/${req.file.path}`;
    }
    const data = {};
    const dataName = ['name', 'image', 'email', 'password', 'phone_number', 'gender', 'birthdate', 'address'];
    dataName.forEach(x=>{
      if(req.body[x]){
        data[x] = req.body[x];
      }
    });
    if(image){
      data.image = image;
    }
    if(id==null || id==undefined){
      return res.status(400).send({
        success: false,
        message: 'Undefined user ID.'
      });
    }
    if(id>0){
      usersProfile.getUser(id, resultId=>{
        if(resultId.length>0){
          if(data.email && data.email!==resultId[0].email){
            usersProfile.checkEmail(data.email, resultEmail=>{
              if(resultEmail.length>0){
                if(data.phone_number && data.phone_number!==resultId[0].phone_number){
                  usersProfile.checkPhone(data.phone_number, resultPhone=>{
                    if(resultPhone<1){
                      usersProfile.updateUser(data, id, results=>{
                        if(results.affectedRows>0){
                          usersProfile.getUser(id, resultUser=>{
                            return res.json({
                              success: true,
                              message: 'success',
                              result: resultUser[0]
                            });
                          });
                        }else{
                          return res.status(500).send({
                            success: false,
                            message: 'Server error: Fail to update data.'
                          });
                        }
                      });
                    }else{
                      return res.status(400).send({
                        success: false,
                        message: 'Phone number has been used.'
                      });
                    }
                  });
                }else{
                  usersProfile.updateUser(data, id, results=>{
                    if(results.affectedRows>0){
                      usersProfile.getUser(id, resultUser=>{
                        return res.json({
                          success: true,
                          message: 'success',
                          result: resultUser[0]
                        });
                      });
                    }else{
                      return res.status(500).send({
                        success: false,
                        message: 'Server error: Fail to update data.'
                      });
                    }
                  });
                }
              }
            });
          }else if(data.phone_number && data.phone_number!==resultId[0].phone_number){
            usersProfile.checkPhone(data.phone_number, resultPhone=>{
              if(resultPhone<1){
                usersProfile.updateUser(data, id, results=>{
                  if(results.affectedRows>0){
                    usersProfile.getUser(id, resultUser=>{
                      return res.json({
                        success: true,
                        message: 'success',
                        result: resultUser[0]
                      });
                    });
                  }else{
                    return res.status(500).send({
                      success: false,
                      message: 'Server error: Fail to update data.'
                    });
                  }
                });
              }else{
                return res.status(400).send({
                  success: false,
                  message: 'Phone number has been used.'
                });
              }
            });
          }else{
            usersProfile.updateUser(data, id, results=>{
              if(results.affectedRows>0){
                usersProfile.getUser(id, resultUser=>{
                  return res.json({
                    success: true,
                    message: 'success',
                    result: resultUser[0]
                  });
                });
              }else{
                return res.status(500).send({
                  success: false,
                  message: 'Server error: Fail to update data.'
                });
              }
            });
          }
        }else{
          return res.status(404).send({
            success: false,
            message: `User with ID: ${id} not found.`
          });
        }
      });
    }else{
      return res.status(400).send({
        success: false,
        message: 'User ID should be a number greater than 0.'
      });
    }
  });
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