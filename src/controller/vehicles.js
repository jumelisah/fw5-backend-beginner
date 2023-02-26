const checkDataType = require('../helpers/dataType');
const { deleteImage, cloudPath } = require('../helpers/deleteImage');
const isNull = require('../helpers/isNull');
const response = require('../helpers/response');
const vehicleModel = require('../models/vehicles');
const {APP_URL} = process.env;

exports.getVehicles = async(req, res)=>{
  try{
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

    let url = `${APP_URL}vehicles?`;
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
      return response(res, 'Vehicle List', vehicleData, 200, pageInfo);
    }else{
      return response(res, 'Data not found', null, 404);
    }
  } catch(err) {
    return response(res, String(err), null, 500);
  }
};

exports.getVehicle = async(req, res)=>{
  try {
    const {id} = req.params;
    if(id>0){
      const resultId = await vehicleModel.getVehicle(id);
      if(resultId.length>0){
        return response(res, 'Vehicle detail', resultId[0]);
      }else{
        return response(res, `Vehicle with ID=${id} not found`, null, 404);
      }
    }else{
      return response(res, 'ID should be a number greater than 0', null, 404);
    }
  }catch{
    return response(res, 'Unexpected error', null, 500);
  }
};

exports.getPopularVehicle = async(req, res)=>{
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

  let url = `${APP_URL}vehicles?`;
  dataName.forEach(x=>{
    if(data[x]){
      url = `${url}${x}=${data[x]}&`;
    }
  });
  if(cost_min>=cost_max){
    return response(res, 'cost_max should be more than cost_min', null, 400);
  }

  const vehicleData = await vehicleModel.getPopularVehicle(data);
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
    return response(res, 'List of popular vehicle', vehicleData, 200, pageInfo);
  }else{
    return response(res, 'Data not found', null, 404);
  }
};

exports.addVehicle = async (req, res)=>{
  try {
    if(req.user.role=='admin'){
      const {name, year, cost, qty, type, seat, category_id, location} = req.body;
      let image = 'https://res.cloudinary.com/juumelisa/image/upload/v1648980071/SERAN/uploads/vehicles/Untitled_design_4_pus3lj.png';
      const data = {name, image, year, cost, qty, type, seat, category_id, location};
      if(req.files?.length > 0){
        image = req.files[0].path;
      }
      data.image = image;
      const dataNumber = ['year', 'cost', 'qty', 'seat', 'category_id'];
      const dataString = ['name', 'location'];
      const dataName = ['name', 'year', 'cost', 'qty', 'seat', 'category_id', 'location'];
      const itsNull = isNull(data, dataName);
      const checkType = checkDataType(data, dataNumber, dataString);
      if(itsNull){
        if(req.files?.length > 0){
          deleteImage(cloudPath(req.files[0].filename));
        }
        return response(res, 'Please fill in all the fields.', null, 400);
      }
      if(checkType.length>0){
        return response(res, checkType, null, 400);
      }
      const checkVehicle = await vehicleModel.getVehicleName(data);
      if(checkVehicle.length>0){
        if(req.files?.length > 0){
          deleteImage(cloudPath(req.files[0].filename));
        }
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
        if(req.files?.length > 0){
          deleteImage(cloudPath(req.files[0].filename));
        }
        return response(res, 'Error: Can\'t add vehicle', null, 500);
      }
    }else{
      if(req.files?.length > 0){
        deleteImage(cloudPath(req.files[0].filename));
      }
      return response(res, 'You are unable to do this action', null, 403);
    }
  } catch (e) {
    if(req.files?.length > 0){
      deleteImage(cloudPath(req.files[0].filename));
    }
    return response(res, 'Unexpected error', null, 500);
  }
};

exports.updateVehicle = async(req, res)=>{
  try{
    const {id} = req.params;
    if(req.user.role=='admin'){
      const data = {};
      let image ='';
      if(req.files?.length>0){
        image = req.files[0].path;
        data.image = image;
      }
      const dataName = ['name', 'year', 'cost', 'qty', 'type', 'seat', 'category_id', 'location', 'available'];
      const dataNumber = ['year', 'cost', 'qty', 'seat', 'category_id'];
      const dataString = ['name', 'location'];
      if(id==null || id==undefined || id==''){
        return response(res, 'Please input the ID first!', null, 400);
      }
      if(id<1){
        if(req.files?.length > 0){
          deleteImage(cloudPath(req.files[0].filename));
        }
        return response(res, 'ID should be a number greater than 0', null, 400);
      }
      const checkType = checkDataType(data, dataNumber, dataString);
      if(checkType.length>0){
        return response(res, checkType, null, 400);
      }
      const resultId = await vehicleModel.getVehicle(id);
      if(resultId.length<1){
        if(req.files?.length > 0){
          deleteImage(cloudPath(req.files[0].filename));
        }
        return response(res, `Vehicle with ID=${id} not found`, null, 404);
      }
      dataName.forEach(x=>{
        if(req.body[x]){
          data[x] = req.body[x];
        }else{
          data[x] = resultId[0][x];
        }
        if(image == ''){
          data.image = resultId[0].image;
        }
      });
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
      if(req.files?.length > 0){
        deleteImage(cloudPath(req.files[0].filename));
      }
      return response(res, 'You are unable to do this action', null, 403);
    }
  } catch {
    if(req.files?.length > 0){
      deleteImage(cloudPath(req.files[0]?.filename));
    }
    return response(res, 'Unexpected Error', 400);
  }
};

exports.deleteVehicle = async(req, res)=>{
  try{
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
        // if(resultId[0].image!==''){
        //   deleteImage(cloudPath(resultId[0].image));
        // }
        const deleteResult = await vehicleModel.deleteVehicle(id);
        if(deleteResult.affectedRows>0){
          const getData = await vehicleModel.getDeletedVehicle(id);
          return response(res, 'Successfully deleted vehicle', getData[0]);
        }
      }else{
        return response(res, `Vehicle with ID=${id} not found`, null, 404);
      }
    }else{
      return response(res, 'You are unable to do this action', null, 403);
    }
  } catch (e) {
    return response(res, 'Unexpected Error', e, 500);
  }
};
