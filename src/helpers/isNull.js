const isNull = (data, dataNumber, dataString)=>{
  let dataNull = 0;
  dataNumber.forEach(x=>{
    if(data[x]==null || data[x]==undefined || data[x]==''){
      dataNull++;
    }
  });
  dataString.forEach(x=>{
    if(data[x]==null || data[x]==undefined || data[x]==''){
      dataNull++;
    }
  });
  if(dataNull>0){
    return true;
  }else{
    return false;
  }
};

module.exports = isNull;