const prof = require('../models/profile');

const getProfile = (req, res)=>{
  const id = req.user.id;
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
  
};

module.exports = {getProfile};