const prof = require('../models/profile');

const getProfile = (req, res)=>{
  const {id} = req.params;
  if(id!==null && id!==undefined){
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
          message: 'User not found'
        });
      }
    });
  }else{
    return res.status(400).send({
      success: false,
      message: 'Please input the ID'
    });
  }
};

module.exports = {getProfile};