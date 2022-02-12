const checkDataType = require('../helpers/dataType');
const isNull = require('../helpers/isNull');
const response = require('../helpers/response');
const vehicleModel = require('../models/vehicles');
const {APP_URL} = process.env;

exports.getVehicles = async(req, res)=>{
  let {name, location, cost_min, cost_max, page, limit} = req.query;
  name = name || '';
  location = location || '';
  cost_min = parseInt(cost_min) || 0;
  cost_max = parseInt(cost_max) || 1000000;
  page = parseInt(page) || 1;
  limit = parseInt(limit) || 5;
  const offset = (page-1)*limit;
  const data = {name, location, cost_min, cost_max, page, limit, offset};
  const dataName = ['name', 'location', 'cost_min', 'cost_max'];

  let url = `${APP_URL}/vehicles?`;
  dataName.forEach(x=>{
    if(data[x]){
      url = `${url}${x}=${data[x]}&`;
    }
  });
  if(cost_min>=cost_max){
    return response(res, 'cost_max should be more than cost_min', null, 400);
  }

  const vehicleData = await vehicleModel.getVehicles(data);
  const totalData = await vehicleModel.countData(data);
  const total = totalData[0].total;
  let last = Math.ceil(total/limit);
  const pageInfo = {
    prev : page > 1 ? `${url}page=${page-1}&limit=${limit}` : null,
    next : page < last ? `${url}page=${page+1}&limit=${limit}` : null,
    currentPage : page,
    lastPage: last
  };
  if(vehicleData.length>0){
    return response(res, 'List of vehicles', {vehicle_data: vehicleData, page_info: pageInfo});
  }else{
    return response(res, 'Data not found', null, 404);
  }
};

exports.getVehicle = async(req, res)=>{
  const {id} = req.params;
  if(id>0){
    const resultId = await vehicleModel.getVehicle(id);
    if(resultId.length>0){
      return response(res, 'Vehicle detail', resultId[0]);
    }else{
      return response(res, `Vehicle with ID=${id} not found`, null, 404);
    }
  }else{
    return response(res, 'ID should be a number greater than 0');
  }
};

exports.addVehicle = async(req, res)=>{
  if(req.user.role=='admin'){
    const {name, year, cost, qty, type, seat, category_id, location} = req.body;
    const data = {name, year, cost, qty, type, seat, category_id, location};
    const dataNumber = ['year', 'cost', 'qty', 'seat', 'category_id'];
    const dataString = ['name', 'location'];
    const itsNull = isNull(data, dataNumber, dataString);
    const checkType = checkDataType(data, dataNumber, dataString);
    if(itsNull){
      return response(res, 'Please fill in all the fields.', null, 400);
    }
    if(checkType.length>0){
      return response(res, checkType, null, 400);
    }
    const checkVehicle = await vehicleModel.getVehicleName(data);
    if(checkVehicle.length>0){
      return response(res, 'Vehicle already on the list', null, 400);
    }
    const addResult = await vehicleModel.addVehicle(data);
    if(addResult.affectedRows>0){
      const resultId = await vehicleModel.getVehicle(addResult.insertId);
      if(resultId.length===1){
        return response(res, 'Successfully add vehicle', resultId[0]);
      }else{
        return response(res, 'Error: Can\'t get data', null, 500);
      }
    }else{
      return response(res, 'Error: Can\'t add vehicle', null, 500);
    }
  }else{
    return response(res, 'You are unable to add data', null, 403);
  }
};

exports.updateVehicle = async(req, res)=>{
  const {id} = req.params;
  if(req.user.role=='admin'){
    const data = {};
    const dataName = ['name', 'year', 'cost', 'qty', 'seat', 'category_id', 'location'];
    const dataNumber = ['year', 'cost', 'qty', 'seat', 'category_id'];
    const dataString = ['name', 'location'];
    dataName.forEach(x=>{
      if(req.body[x]){
        data[x] = req.body[x];
      }
    });
    if(id==null || id==undefined || id==''){
      return response(res, 'Please input the ID first!', null, 400);
    }
    if(id<1){
      return response(res, 'ID should be a number greater than 0', null, 400);
    }
    const checkType = checkDataType(data, dataNumber, dataString);
    if(checkType.length>0){
      return response(res, checkType, null, 400);
    }
    const resultId = await vehicleModel.getVehicle(id);
    if(resultId.length<1){
      return response(res, `Vehicle with ID=${id} not found`, null, 404);
    }
    const checkVehicle = await vehicleModel.getVehicleName(data);
    if(checkVehicle.length>0 && checkVehicle[0].id!==parseInt(id)){
      return response(res, 'Vehicle already on the list', null, 400);
    }
    const updateResult = await vehicleModel.updateVehicle(data, id);
    if(updateResult.affectedRows>0){
      const newVehicle = await vehicleModel.getVehicle(id);
      if(newVehicle.length>0){
        return response(res, 'Successfully update vehicle data', newVehicle[0]);
      }
    }
  }else{
    return response(res, 'You are unable to do this action', null, 403);
  }
};

exports.deleteVehicle = async(req, res)=>{
  if(req.user.role=='admin'){
    const {id} = req.params;
    if(id==null || id==undefined || id==''){
      return response(res, 'Please input the ID first!', null, 400);
    }
    if(id<1){
      return response(res, 'ID should be a number greater than 0', null, 400);
    }  
    const resultId = await vehicleModel.getVehicle(id);
    if(resultId.length>0){
      const deleteResult = await vehicleModel.deleteVehicle(id);
      if(deleteResult.affectedRows>0){
        return response(res, 'Successfully deleted vehicle', resultId[0]);
      }
    }else{
      return response(res, `Vehicle with ID=${id} not found`, null, 404);
    }
  }else{
    return response(res, 'You are unable to do this action', null, 403);
  }
};
