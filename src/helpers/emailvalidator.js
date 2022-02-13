const validator = require('email-validator');

const isEmail = (email)=>{
  return validator.validate(email);
};

module.exports = isEmail;