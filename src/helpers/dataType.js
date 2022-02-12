const checkDataType = (data, dataNumber, dataString)=>{
  let newData = {};
  let dataError = [];
  dataNumber.forEach(x=>{
    if(data[x]!==null && data[x]!==undefined && data[x]!==''){
      newData[x] = parseInt(data[x]);
      if(isNaN(newData[x])==true){
        dataError.push(`${x} should be a NUMBER`);
      }
    }
  });

  dataString.forEach(x=>{
    if(data[x]!==null && data[x]!==undefined && data[x]!==''){
      newData[x] = parseInt(data[x]);
      if(!isNaN(newData[x])){
        dataError.push(`${x} should be a STRING`);
      }
    }
  });
  return dataError;
};

module.exports = checkDataType;