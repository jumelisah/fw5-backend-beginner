const isNull = (data, dataName)=>{
  let dataNull = 0;
  dataName.forEach(x=>{
    if(data[x]==null || data[x]==undefined || data[x]==''){
      dataNull++;
      console.log(x);
    }
  });
  if(dataNull>0){
    return true;
  }else{
    return false;
  }
};

module.exports = isNull;