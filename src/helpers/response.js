const response = (res, message, result, stat=200, pageInfo)=>{
  let success = true;
  if(stat>=400){
    success = false;
  }
  const data = {success, message};
  if(result){
    data.result = result;
  }
  if(pageInfo){
    data.pageInfo = pageInfo;
  }
  return res.status(stat).json(data);
};

module.exports = response;