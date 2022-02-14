const prof = require('../models/profile');

const getProfile = (req, res)=>{
  let {id} = req.params;
  if(id==undefined || id==null || id==''){
    id = req.user.id;
  }
  if(id>0){
    prof.getProfile(id, result=>{
      if(result.length>0){
        return res.json({
          success: true,
          message: `User profile with ID: ${id}`,
          result: result
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
    });
  }
  
};

module.exports = {getProfile};