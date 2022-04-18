const response = require('../helpers/response');
const locationsModel = require('../models/locations');
const {APP_URL} = process.env;

exports.getLocation = async(req, res) => {
  try {
    let {location, page, limit} = req.query;
    location = location || '';
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;
    const offset = (page-1) * limit;
    const data = {location, limit, offset};
    const url = `${APP_URL}locations?location=${location}`;
    const locations = await locationsModel.getLocation(data);
    const total = await locationsModel.countLocation(data);
    const totalData = total[0].totalData;
    const last = Math.ceil(totalData/limit);
    const pageInfo = {
      prev: page > 1 ? `${url}&page=${page-1}&limit=${limit}` : null,
      next: page < last ? `${url}&page=${page+1}&limit=${limit}` : null,
      currentPage: page,
      lastPage: last,
      totalData
    };
    return response(res, 'List of city', locations, 200, pageInfo);
  } catch {
    return response(res, 'Unexpected error', null, 500, null);
  }
};

exports.addLocations = async(req, res) => {
  try {
    if(req.user.role !== 'admin') {
      return response(res, 'Unauthorized', null, 403, null);
    }
    const {location} = req.body;
    const getLocation = await locationsModel.getLocationByName(location);
    if(getLocation.length > 0) {
      return response(res, 'Location already exist', null, 400, null);
    }
    const newLocation = await locationsModel.addLocation(location);
    const getNewLocation = await locationsModel.getLocationById(newLocation.insertId);
    return response(res, 'Successfully add new location', getNewLocation);
  } catch (e) {
    return response(res, 'Unexpected error', null, 500, null);
  }
};

exports.editLocation = async(req, res) => {
  try{
    if(req.user.role !== 'admin') {
      return response(res, 'Unauthorized', null, 403, null);
    }
    const {id} = req.params;
    const {location} = req.body;
    const checkLocation = await locationsModel.getLocationByName(location);
    if(checkLocation.length > 0) {
      return response(res, 'Location already exist', null, 400);
    }
    await locationsModel.editLocation(id, location);
    const updatedData = await locationsModel.getLocationById(id);
    return response(res, 'Successfully edit location', updatedData);
  } catch (e) {
    return response(res, 'Unexpected error', null, 500, null);
  }
};

exports.deleteLocation = async(req, res) => {
  try {
    const {id} = req.params;
    const getLocation = await locationsModel.getLocationById(id);
    if (getLocation.length < 1) {
      return(res, 'Not found', null, 404);
    }
    await locationsModel.deleteLocation(id);
    return response(res, 'Successfully deleted data', getLocation);
  } catch (e) {
    return response(res, 'Unexpected error', null, 500, null);
  }
};
