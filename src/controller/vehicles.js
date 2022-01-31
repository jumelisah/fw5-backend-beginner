const vehicleModel = require('../models/vehicles');

const getVehicles = (req, res)=>{
  vehicleModel.getVehicles(results=>{
    return res.json({
      success: true,
      message: 'List of Vehicles',
      results : results
    });
  });
};

const getVehicle = (req,res)=>{
  const {id} = req.params;
  vehicleModel.getVehicle(id, results=>{
    if(results.length>0){
      return res.json({
        success: true,
        message: 'Vehicle details',
        results: results[0]
      });
    }else{
      return res.status(404).send({
        success: false,
        message: 'Vehicle not found'
      });
    }
  });
};
const dataKosong = (data)=>{
  let isKosong = 0;
  for(let i = 0; i<data.length;i++){
    if(data[i]==null || data[i]==undefined || data[i]==''){
      isKosong++;
    }
  }
  return isKosong;
};

const dataType = (data)=>{
  const dataName = ['Name', 'Release Year', 'Cost', 'Qty', 'Seat', 'Type', 'Class', 'location'];
  let theType = ['isNaN', 'number', 'number', 'number', 'number', 'isNaN', 'isNaN', 'isNaN'];
  let newData = [];
  let dataError = [];
  for(let i = 0; i<data.length; i++){
    newData.push(parseInt(data[i]));
    if(theType[i]=='isNaN'){
      if(isNaN(newData[i])===false){
        dataError.push(`${dataName[i]} must a STRING`);
      }
    }else{
      if(isNaN(newData[i])===true){
        dataError.push(`${dataName[i]} must a NUMBER`);
      }
    }
  }

  return dataError;
};

const addVehicle = (req,res)=>{
  const data = [req.body.name, req.body.year, req.body.cost, req.body.available, req.body.seat, req.body.type, req.body.class, req.body.location];
  let a = dataKosong(data);
  let b = dataType(data);
  vehicleModel.checkVehicle(data[0], result=>{
    if(a<1){
      if(b<1){
        let isThere = 0;
        if(result.length>0){
          result.forEach(element=>{
            if(element.year===req.body.year && element.type===req.body.type && element.location===req.body.location){
              isThere++;
            }
          });
        }
        if(isThere==0){
          vehicleModel.addVehicle(data, results=>{
            return res.send({
              success: true,
              message: 'Success add vehicle',
              results: `Rows affected: ${results.affectedRows}`
            });
          });
        }else{
          return res.status(400).send({
            success: false,
            message: 'Vehicle already on the list'
          });
        }
      }else{
        return res.status(400).send({
          success: false,
          message: b
        });
      }
    }else{
      return res.send({
        success: false,
        message: 'Can\'t input empty data'
      });
    }
  });
};

const updateVehicle = (req, res)=>{
  const {id} = req.params;
  const data = [req.body.name, req.body.year, req.body.cost, req.body.available, req.body.seat, req.body.type, req.body.class, req.body.location, id];
  let a = dataKosong(data);
  let b = dataType(data);
  vehicleModel.getVehicle(id, results=>{
    if(a<1){
      if(b<1){
        if(results.length>0){
          vehicleModel.checkVehicle(data[0], result=>{
            console.log(dataType(data));
            let yesThere = 0;
            if(result.length>0){
              result.forEach(element=>{
                if(element.year===req.body.year && element.type===req.body.type && element.location===req.body.location){
                  if(element.id==req.params.id){
                    yesThere = 0;
                  }else{
                    yesThere++;
                  }
                }
              });
            }
            if(yesThere==0){
              vehicleModel.updateVehicle(data, result=>{
                return res.send({
                  success: true,
                  message: 'Success update vehicle',
                  result: `Rows affected: ${result.affectedRows}`
                });
              });
            }else{
              return res.status(400).send({
                success: false,
                message: 'Vehicle already on the list'
              });
            }
          });
        }else{
          return res.status(404).send({
            success: false,
            message: 'Vehicle not found'
          });
        }
      }else{
        return res.status(400).send({
          success: false,
          message: b
        });
      }
    }else{
      return res.status(400).send({
        success: false,
        message: 'Can\'t input empty data'
      });
    }
  });
};

const deleteVehicle = (req, res)=>{
  const {id} = req.params;
  vehicleModel.getVehicle(id, results=>{
    if(id!==null && id!==undefined){
      if(results.length>0){
        vehicleModel.deleteVehicle(id, result=>{
          return res.send({
            success: true,
            message: 'Deleted',
            result: `Affected ROows ${result.affectedRows}`
          });
        });
      }else{
        return res.status(404).send({
          success: false,
          message: 'Vehicle not found'
        });
      }
    }else{
      return res.status(400).send({
        success: false,
        message: 'Id tidak boleh kosong'
      });
    }
  });
};

module.exports = {getVehicles, getVehicle, addVehicle, updateVehicle, deleteVehicle};