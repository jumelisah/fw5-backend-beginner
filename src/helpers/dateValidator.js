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

const changeDate = (date)=>{
  const expired = moment(date).add(2, 'm').toDate();
  let b = expired.getDate();
  let a = expired.getMonth()+1;
  let c = expired.getHours();
  let d = expired.getMinutes();
  let e = expired.getSeconds();
  console.log(e.length);
  let dates = [expired.getFullYear(), a,b,c,d,e];
  for(let i =1; i<dates.length;i++){
    if(parseInt(dates[i])<10){
      dates[i]='0'+dates[i];
    }
  }
  let x = dates.join('');
  return x;
};

module.exports = {isDate, changeDate};