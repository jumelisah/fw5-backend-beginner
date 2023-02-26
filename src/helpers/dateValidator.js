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

const changeDate = (date, y)=>{
  const expired = moment(date).add(y, 'm').toDate();
  let b = expired.getDate();
  let a = expired.getMonth()+1;
  let c = expired.getHours();
  let d = expired.getMinutes();
  let e = expired.getSeconds();
  let dates = [expired.getFullYear(), a,b,c,d,e];
  for(let i =1; i<dates.length;i++){
    if(parseInt(dates[i])<10){
      dates[i]='0'+dates[i];
    }
  }
  let x = dates.join('');
  return x;
};

const dateDifference = (dateA, dateB)=>{
  const firstDate = new Date(dateA);
  const secondDate = new Date(dateB);
  const diff = Math.abs(firstDate.getTime()-secondDate.getTime())/(1000*3600*24);
  return diff;
};

const getDateDiff = (dateA, dateB)=>{
  const a = isDate(dateA);
  const b = isDate(dateB);
  if(a=='Invalid Date'){
    return 'Invalid Date';
  }
  if(b=='Invalid Date'){
    return 'Invalid Date';
  }
  let c = changeDate(a);
  let d = changeDate(b);
  let e = dateDifference(c, d);
  return e;
};

const isLessThan = (timeA, timeB)=>{
  const a = new Date(timeA).getTime();
  const b = new Date(timeB).getTime();
  if(a<b){
    return true;
  }else{
    return false;
  }
};

module.exports = {isDate, changeDate, dateDifference, getDateDiff, isLessThan};