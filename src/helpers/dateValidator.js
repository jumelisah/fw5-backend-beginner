const moment = require('moment-timezone');

const reverseMonth = (date, separator)=>{
  let a = date.split(separator);
  let b = a.pop();
  a.unshift(b);
  date = a.join(separator);
  return date;
};

const reverseDate = (date, separator)=>{
  let a = date.split(separator);
  let b = a.pop();
  let c = a.shift();
  a.unshift(b);
  a.push(c);
  date = a.join(separator);
  return date;
};

const isDate = (date)=>{
  if(moment(date, 'YYYY/MM/DD', true).isValid()){
    return date;
  }else if(moment(date, 'YYYY-MM-DD', true).isValid()){
    return date;
  }else if(moment(date, 'MM/DD/YYYY', true).isValid()){
    return reverseMonth(date, '/');
  }else if(moment(date, 'MM-DD-YYYY', true).isValid()){
    return reverseMonth(date, '-');
  }else if(moment(date, 'DD/MM/YYYY', true).isValid()){
    return reverseDate(date, '/');
  }else if(moment(date, 'DD-MM-YYYY', true).isValid()){
    return reverseDate(date, '-');
  }else{
    return 'Invalid Date';
  }
};

module.exports = isDate;