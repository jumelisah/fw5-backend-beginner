const rentHistories = require('../models/histories');
const vehicles = require('../models/vehicles');
const users = require('../models/users');

const getHistories = (req, res)=>{
  rentHistories.getHistories(results=>{
    return res.json({
      success: true,
      message: 'Histories',
      result: results
    });
  });
};

const getHistory = (req, res)=>{
  const {id} = req.params;
  rentHistories.getHistory(id, results=>{
    if(results.length>0){
      return res.json({
        success: true,
        message: `Rent history with ID: ${id}`,
        result: results[0]
      });
    }else{
      return res.status(404).send({
        success: false,
        message: `ID: ${id} not found`
      });
    }
  });
};

// const checkAvailable = (veh)=>{
//   let a = 0;
//   rentHistories.checkAvailable(veh, result=>{
//     if(result.length>0){
      
//       a = result[0].available;
//     }
//   });
//   return a;
// };

const isNull = (data)=>{
  let a = 0;
  for(let i=0; i<data.length;i++){
    if(data[i]==''){
      a++;
    }
  }
  return a;
};

const dataType = (data)=>{
  const dataName = ['vehicle_id', 'user_id', 'prepayment', 'rent_date', 'return_date'];
  const typeData = ['number', 'number', 'number', 'number', 'number'];
  const dataThrow = [];
  const dataError = [];
  for(let i=0; i<dataName.length;i++){
    dataThrow.push(parseInt(data[i]));
  }
  for(let j=0; j<dataThrow.length;j++){
    if(typeData[j]!=='isNaN'){
      if(isNaN(dataThrow[j])==true){
        dataError.push(`${dataName[j]} must be a NUMBER`);
      }
    }else{
      if(isNaN(dataThrow[j])==false){
        dataError.push(`${dataName[j]} must be a STRING`);
      }
    }
  }
  return dataError;
};

const addHistories = (req, res)=>{
  const {vehicle_id, user_id, prepayment, rent_date, return_date} = req.body;
  const data = [vehicle_id, user_id, prepayment, rent_date, return_date];
  let b = isNull(data);
  let c = dataType(data);
  if(b<1){
    if(c.length<1){
      vehicles.getVehicle(vehicle_id, results=>{
        if(results.length>0){
          if(results[0].available>0){
            users.getUser(user_id, ress=>{
              if(ress.length>0){
                rentHistories.addHistories(data, result=>{
                  return res.json({
                    success: true,
                    message: 'Data added',
                    result: `Affected Rows : ${result.affectedRows}`
                  });
                });
              }else{
                return res.status(404).send({
                  success: false,
                  message: 'User not found'
                });
              }
            });
          }else{
            return res.status(400).send({
              success: false,
              message: 'Vehicle not available'
            });
          }
        }else{
          return res.status(404).send({
            success: false,
            message: `Can't find vehicle with ID: ${vehicle_id}`
          });
        }
      });
    }else{
      return res.status(400).send({
        success: false,
        message: c
      });
    }
  }else{
    return res.status(400).send({
      success: false,
      message: 'Please fill all columns'
    });
  }
};

const updateHistory = (req, res)=>{
  const {id} = req.params;
  const {vehicle_id, user_id, prepayment, rent_date, return_date} = req.body;
  const data = [vehicle_id, user_id, prepayment, rent_date, return_date, id];
  rentHistories.getHistory(id, resultId=>{
    if(resultId.length>0){
      let b = isNull(data);
      let c = dataType(data);
      if(b<1){
        if(c.length<1){
          vehicles.getVehicle(vehicle_id, results=>{
            if(results.length>0){
              if(results[0].available>0){
                users.getUser(user_id, ress=>{
                  if(ress.length>0){
                    rentHistories.getHistory(id, results=>{
                      if(results.length>0){
                        rentHistories.updateHistory(data, result=>{
                          return res.json({
                            success: true,
                            message: 'History was update',
                            result: `Rows affected: ${result.affectedRows}`
                          });
                        });
                      }else{
                        return res.status(404).send({
                          success: false,
                          message: `History with ID: ${id} not found`
                        });
                      }
                    });
                  }else{
                    return res.status(404).send({
                      success: false,
                      message: `User with ID: ${user_id} was not found`
                    });
                  }
                });
              }else{
                return res.status(400).send({
                  success: false,
                  message: 'Vehicle not available'
                });
              }
            }else{
              return res.status(404).send({
                success: false,
                message: `Can't find vehicle with ID: ${vehicle_id}`
              });
            }
          });
        }else{
          return res.status(400).send({
            success: false,
            message: c
          });
        }
      }else{
        return res.status(400).send({
          success: false,
          message: 'Please fill all columns'
        });
      }
    }else{
      return res.status(404).send({
        success: false,
        message: `Can't find history with ID: ${id}`
      });
    }
  });
};

const deleteHistory = (req, res)=>{
  const {id} = req.params;
  if(id!==null && id!==undefined){
    rentHistories.getHistory(id, results=>{
      if(results.length>0){
        rentHistories.deleteHistory(id, result=>{
          return res.json({
            success: true,
            message: `History with ID: ${id} was deleted`,
            result: `Rows affected: ${result.affectedRows}`
          });
        });
      }else{
        return res.status(404).send({
          success: false,
          message: `ID: ${id} not found`
        });
      }
    });
  }else{
    return res.status(400).send({
      success: false,
      message: 'Undefined ID'
    });
  }
};

module.exports = {getHistories, getHistory, addHistories, updateHistory, deleteHistory};