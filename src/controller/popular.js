const popularRent = require('../models/popular');

const popularList = (req, res)=>{
  popularRent.popularList(result=>{
    return res.json({
      success: true,
      message: 'List of popular vehicle',
      result: result
    });
  });
};

module.exports = {popularList};