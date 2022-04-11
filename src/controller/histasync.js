const checkDataType = require('../helpers/dataType');
const { isDate, dateDifference, changeDate, isLessThan} = require('../helpers/dateValidator');
const isNull = require('../helpers/isNull');
const response = require('../helpers/response');
const historyModel = require('../models/histasync');
const vehicleModel = require('../models/vehicles');
const userModel = require('../models/users');
const {APP_URL} = process.env;

exports.getHistories = async(req, res)=>{
  try{
    if(req.user.role=='admin'){
      let {vehicle_name, page, limit} = req.query;
      vehicle_name = vehicle_name || '';
      page = parseInt(page) || 1;
      limit = parseInt(limit) || 5;
      const offset = (page-1)*limit;
      const data = {vehicle_name, page, limit, offset};
      const historiesResult = await historyModel.getHistories(data);
      if(historiesResult.length>0){
        return response(res, 'List of histories', historiesResult);
      }else{
        return response(res, 'History not found', null);
      }
    }else{
      return response(res, 'You are not allow to see this page', null, 403);
    }
  } catch {
    return response(res, 'Unexpected error', null, 500);
  }
};

exports.getHistory = async(req, res)=>{
  if(req.user.role=='admin'){
    const {id} = req.params;
    if(id>0){
      const historyResult = await historyModel.getHistory(id);
      if(historyResult.length>0){
        return response(res, `Rent History with ID: ${id}`, historyResult[0]);
      }else{
        return response(res, `History with ID: ${id} not found`, null, 404);
      }
    }else{
      return response(res, 'History ID should be a number greater than 0', null, 400);
    }
  }else{
    return response(res, 'You are not allow to see this page', null, 403);
  }
};

exports.getUserHistories = async(req, res)=>{
  try {
    const user_id = req.user.id;
    let {page, limit} = req.query;
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 5;
    const offset = (page-1)*limit;
    const data = {user_id, limit, page, offset};
    let url = `${APP_URL}histories/user?`;
    const historyResult = await historyModel.userHistories(data);
    const total = await historyModel.userHistoriesTotal(user_id);
    let last = Math.ceil(total/limit);
    const pageInfo = {
      prev: page>1 ? `${url}page=${page-1}&limit=${limit}` : null,
      next: page<last ? `${url}page=${page+1}&limit=${limit}` : null,
      currentPage : page,
      last : last
    };
    if(historyResult.length>0){
      return response(res, 'Rent History', [historyResult,pageInfo]);
    }else{
      return response(res, 'History not found', null, 404);
    }
  } catch (e) {
    console.log(e);
    return response(res, 'Unexpected error',null, 500);
  }
};

exports.addHistory = async(req, res)=>{
  try {
    const user_id = req.user.id;
    const {vehicle_id, sum, rent_date, return_date, recipient, email, address, phone_number} = req.body;
    const data = {vehicle_id, user_id, sum, rent_date, return_date, recipient, email, address, phone_number};
    const dataName = ['vehicle_id', 'sum', 'rent_date', 'return_date', 'recipient', 'address', 'email','phone_number'];
    const dataNumber = ['vehicle_id', 'user_id', 'sum'];
    const itsNull = isNull(data, dataName); // Check if data is null (itsNull return true or false)
    if(itsNull){
      return response(res, 'Please fill in all the fields', null, 400);
    }
    const dataType = checkDataType(data, dataNumber, []);
    if(dataType.length>0){
      return response(res, dataType, null, 400);
    }
    const itsDate = isDate(rent_date); // Check if date is invalid
    if(itsDate=='Invalid Date'){
      return response(res, itsDate, null, 400);
    }
    const itsReturnDate = isDate(return_date);
    if(itsReturnDate=='Invalid Date'){
      return response(res, itsReturnDate, null, 400);
    }
    const lessThanToday = isLessThan(rent_date, new Date()); //Check if rent date less than today
    const diffToday = dateDifference(rent_date, new Date()); //Check how many days before rent date
    if(lessThanToday || diffToday<1){
      return response(res, 'Reservation should be made at least 1 day before rent date', null, 400);
    }
    const itsLessThan = isLessThan(rent_date, return_date); //Check if rent date less than return date
    if(!itsLessThan){
      return response(res, 'Rent date should be earlier than return date!', null, 400);
    }
    const getUser = await userModel.getUser(data.user_id);
    if (getUser.length<1){
      return response(res, 'User not found', null, 400);
    }
    data.rent_date = changeDate(rent_date);
    data.return_date = changeDate(return_date);
    const dateDiff = dateDifference(rent_date, return_date);
    const userBook = await historyModel.getUser(user_id);
    if(userBook.length>1){
      return response(res, 'You has pass rent limit. Please finish or cancel your past transaction first', null, 400);
    }
    const getVehicle = await vehicleModel.getVehicle(vehicle_id);
    if(getVehicle.length<1){
      return response(res, 'Vehicle not found', null, 404);
    }
    const checkAvailable = await historyModel.getVehicleAvailable(data);
    let stock = checkAvailable.length+getVehicle[0].qty;
    if(stock<1){
      return response(res, 'Vehicle not available at the moment', null, 400);
    }
    if(getVehicle[0].qty<0){
      stock = checkAvailable.length;
    }
    if(sum>stock){
      return response(res, `Maximal order: ${stock} vehicles`, null, 400);
    }
    data.total_cost = getVehicle[0].cost*sum*dateDiff;
    data.prepayment = 0;
    if(getVehicle[0].prepayment=='Prepayment'){
      data.prepayment = data.total_cost/2;
    }
    const addResult = await historyModel.addHistory(data);
    if(addResult.affectedRows<1){
      return response(res, 'Cant do the reservation', null, 500);
    }
    const changeQty = await historyModel.updateQtyMin(getVehicle[0].id, data.sum);
    if(changeQty.affectedRows<1){
      return response(res, 'Server error', null, 500);
    }
    const getNewHist = await historyModel.getHistory(addResult.insertId);
    if(getNewHist.length<1){
      return response(res, 'Server error', null, 500);
    }
    return response(res, 'Successfully made reservation', getNewHist[0]);
  } catch{
    return response(res, 'Unexpected error',null, 500);
  }
};

exports.editHistoryStatus = async (req, res) => {
  try{
    const {id} = req.params;
    const getResult = await historyModel.getHistory(id);
    if (getResult.length < 1) {
      return response(res, 'History not found');
    }
    if (getResult[0].user_id !== req.user.id || req.user.role !== 'admin') {
      return response (res, 'Unauthorized', null, 403);
    }
    const resultUpdate = await historyModel.updateHistory({status: req.body.status}, id);
    if (resultUpdate.affectedRows < 1) {
      return response(res, 'Unexpected error', null, 500);
    }
    if (req.body.status === 4 || req.body.status === 'Cancelled') {
      const changeQty = await historyModel.updateVehicle(getResult[0].vehicle_id);
      if (changeQty.affectedRows < 1) {
        return response(res, 'Unexpected error', null, 500);
      }
    }
    const updatedData = await historyModel.getHistory(id);
    return response(res, 'Transaction was updated', updatedData, 200);

  }catch{
    return response(res, 'Unexpected error', null, 500);
  }
};

exports.updateHistory = async(req, res)=>{
  try {
    const {id} = req.params;
    const data = {};
    const dataName = ['vehicle_id', 'user_id', 'cost', 'prepayment', 'status', 'rent_date', 'return_date'];
    const getResult = await historyModel.getHistory(id);
    if(getResult.length<1){
      return response(res, 'History not found');
    }
    dataName.forEach(x=>{
      if(req.body[x]){
        data[x] = req.body[x];
      }else{
        data[x] = getResult[0][x];
      }
    });
    if(getResult[0].status=='Cancelled' || getResult[0].status=='Returned'){
      return response(res, 'Can\'t change history', null, 400);
    }
    if(req.body.user_id){
      const getUser = await userModel.getUser(data.user_id);
      if (getUser.length<1){
        return response(res, 'User not found', null, 400);
      }
    }
    if(req.body.vehicle_id){
      const getVehicle = await vehicleModel.getVehicle(data.vehicle_id);
      if(getVehicle.length<1){
        return response(res, 'Vehicle not found', null, 404);
      }
    }
    if(req.body.rent_date){
      const itsDate = isDate(req.body.rent_date);
      if(itsDate=='Invalid Date'){
        return response(res, itsDate, null, 400);
      }
      data.rent_date = itsDate;
    }
    if(req.body.return_date){
      const itsReturnDate = isDate(req.body.return_date);
      if(itsReturnDate=='Invalid Date'){
        return response(res, itsReturnDate, null, 400);
      }
      data.return_date = itsReturnDate;
    }
    let a = data.rent_date;
    let b = data.return_date;
    const dateDiffOld = dateDifference(getResult[0].rent_date, getResult[0].return_date);
    const dateDiff = dateDifference(a, b);
    const costPerDay = getResult[0].cost/dateDiffOld;
    data.cost = costPerDay*dateDiff;
    const min_payment = data.cost/2;
    if(data.prepayment<min_payment || data.payment>data.cost){
      return response(res, `Prepayment should between Rp${min_payment} - Rp${data.cost}`);
    }
  
    if(!req.body.status || req.body.status==getResult[0].status){
      const resultUpdate = await historyModel.updateHistory(data, id);
      if(resultUpdate.affectedRows>0){
        const getUpdatedHistory = await historyModel.getHistory(id);
        if(getUpdatedHistory.length>0){
          return response(res, 'Successfully update history', getUpdatedHistory[0]);
        }else{
          return response(res, 'Can\'t get updated history', null, 500);
        }
      }else{
        return response(res, 'Error: Can\'t update history', null, 500);
      }
    }
    if(req.body.status=='Cancelled' || req.body.status=='Returned'){
      const resultUpdate = await historyModel.updateHistory(data, id);
      if(resultUpdate.affectedRows>0){
        const getUpdatedHistory = await historyModel.getHistory(id);
        if(getUpdatedHistory.length>0){
          const changeQty = await historyModel.updateVehicle(data.vehicle_id);
          if(changeQty.affectedRows>0){
            return response(res, 'Successfully update history', getUpdatedHistory[0]);
          }else{
            return response(res, 'Error: Can\' update vehicle', null, 400);
          }
        }else{
          return response(res, 'Can\'t get updated history', null, 500);
        }
      }else{
        return response(res, 'Error: Can\'t update history', null, 500);
      }
  
    }
  }catch{
    return response(res, 'Unexpected error', null, 500);
  }
};

exports.deleteHistoryUser = async(req, res)=>{
  try {
    const {id} = req.params;
    if(id==null || id==undefined || id==''){
      return response(res, 'Undefined ID', null, 400);
    }
    const historyResult = await historyModel.getHistory(id);
    if(historyResult.length<1){
      return response(res, `History with ID: ${id} not found`, null, 404);
    }
    if (req.user.id!==historyResult[0].user_id) {
      return response(res, 'You are not allow to do this action', null, 403);
    }
    const deleteResult = await historyModel.deleteHistoryUser(id);
    if(deleteResult.affectedRows>0){
      return response(res, 'Successfully delete history', historyResult[0]);
    }
  } catch {
    return response(res, 'Unexpected Error', null, 500);
  }
};

exports.deleteHistoryAdmin = async(req, res)=>{
  try {
    if (req.user.role !== 'admin') {
      return response(res, 'Unauthorized', null, 403);
    }
    const {id} = req.params;
    if(id==null || id==undefined || id==''){
      return response(res, 'Undefined ID', null, 400);
    }
    const historyResult = await historyModel.getHistory(id);
    if(historyResult.length<1){
      return response(res, `History with ID: ${id} not found`, null, 404);
    }
    const deleteResult = await historyModel.deleteHistoryAdmin(id);
    if(deleteResult.affectedRows>0){
      return response(res, 'Successfully delete history', historyResult[0]);
    }
  } catch {
    return response(res, 'Unexpected Error', null, 500);
  }
};