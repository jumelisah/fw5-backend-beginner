const popularRent = require('../models/popular');
const {APP_URL} = process.env;

const popularList = (req, res)=>{
  let {vehicle_name, location, cost_min, cost_max, page, limit} = req.query;
  vehicle_name = vehicle_name || '';
  location = location || '';
  cost_min = parseInt(cost_min) || 0;
  cost_max = parseInt(cost_max) || 10000000;
  page = parseInt(page) || 1;
  limit = parseInt(limit) || 4;
  const offset = (page-1)*limit;
  const data = {vehicle_name, location, cost_min, cost_max, page, limit, offset};
  const dataName = ['name', 'location', 'cost_min', 'cost_max'];

  let url = `${APP_URL}/popular?`;
  dataName.forEach(x=>{
    if(data[x]){
      url = `${url}${x}=${data[x]}&`;
    }
  });
  if(cost_min>=cost_max){
    return res.status(400).send({
      success: false,
      message: 'cost_min should be less than cost_max'
    });
  }
  popularRent.popularList(data, results=>{
    if(results.length>0){
      popularRent.totalData(data, result=>{
        const total = result.length;
        console.log(total);
        let last = Math.ceil(total/limit);
        const pageInfo = {
          prev : page > 1 ? `${url}page=${page-1}&limit=${limit}` : null,
          next : page < last ? `${url}page=${page+1}&limit=${limit}` : null,
          currentPage : page,
          lastPage: last
        };
        return res.json({
          success: true,
          message: 'List of popular vehicle',
          result: results, pageInfo
        });
      });
    }else{
      return res.send({
        success: false,
        message: 'Data not found'
      });}
  });
};

const popularByTown = (req, res)=>{
  let {location, page, limit} = req.query;
  location = location || '';
  page = parseInt(page) || 1;
  limit = parseInt(limit) || 4;
  const offset = (page-1)*limit;

  const data= {location, page, limit, offset};
  let url = `${APP_URL}/popular?city=${location}&`;
  popularRent.popularByTown(data, results=>{
    if(results.length>0){
      popularRent.totalPopularTown(data, result=>{
        const total = result[0].total;
        let last = Math.ceil(total/limit);
        const pageInfo = {
          prev : page > 1 ? `${url}page=${page-1}&limit=${limit}` : null,
          next : page < last ? `${url}page=${page+1}&limit=${limit}` : null,
          currentPage : page,
          lastPage: last
        };
        return res.json({
          success: true,
          message: `List of popular vehicle in ${data.location}`,
          result: results, pageInfo
        });

      });
    }
  });
};

const popularId = (req, res)=>{
  const {category_id} = req.params;
  let {vehicle_name, location, cost_min, cost_max, page, limit} = req.query;
  vehicle_name = vehicle_name || '';
  location = location || '';
  cost_min = parseInt(cost_min) || 0;
  cost_max = parseInt(cost_max) || 1000000;
  page = parseInt(page) || 1;
  limit = parseInt(limit) || 5;
  const offset = (page-1)*limit;
  const data = {vehicle_name, location, cost_min, cost_max, page, limit, offset, category_id};
  const dataName = ['vehicle_name', 'location', 'cost_min', 'cost_max'];
  if(cost_min>=cost_max){
    return res.status(400).send({
      success: false,
      message: 'cost_min should be less than cost_max'
    });
  }
  let url = `${APP_URL}/popular/${category_id}?`;
  dataName.forEach(x=>{
    if(data[x]){
      url = `${url}${x}=${data[x]}&`;
    }
  });
  if(category_id>0){
    popularRent.popularId(data, result=>{
      if(result.length>0){
        const total = result.length;
        let last = Math.ceil(total/limit);
        const pageInfo = {
          prev : page > 1 ? `${url}page=${page-1}&limit=${limit}` : null,
          next : page < last ? `${url}page=${page+1}&limit=${limit}` : null,
          currentPage : page,
          lastPage: last
        };
        return res.json({
          success: true,
          message: 'list id',
          result: result,
          pageInfo
        });
      }else{
        return res.status(404).send({
          success: false,
          message: `Vehicle with ID: ${category_id} not found`
        });
      }
    });
  }else{
    return res.status(400).send({
      success: false,
      message: 'ID should be a number greater than 0'
    });
  }
};

const popularByMonth = (req, res)=>{
  let today = new Date();
  const {category_id} = req.params;
  let {month, year, vehicle_name, location, cost_min, cost_max, page, limit,} = req.query;
  month = month || today.getMonth()+1;
  year = year || today.getFullYear();
  vehicle_name = vehicle_name ||'';
  location = location || '';
  cost_min = parseInt(cost_min) || 0;
  cost_max = parseInt(cost_max) || 1000000;
  page = parseInt(page) || 1;
  limit = parseInt(limit) || 5;
  const offset = (page-1)*limit;
  const data = {month, year, vehicle_name, location, cost_min, cost_max, page, limit, offset, category_id};
  const cb = (results)=>{
    if(results.length>0){
      return res.json({
        success: true,
        message: 'Popular vehicle',
        result: results
      });
    }else{
      return res.status(404).send({
        success: false,
        message: 'Data not found'
      });
    }
  };
  if(month>12){
    return res.status(400).send({
      success: false,
      message: 'Error: month should between 1-12'
    });
  }
  if(cost_min>=cost_max){
    return res.status(400).send({
      success: false,
      message: 'cost_min should be less than cost_max'
    });
  }
  if(category_id==null && category_id==undefined){
    popularRent.popularMonth(data, cb);
  }else{
    popularRent.popularMonthAndCId(data, cb);
  }
};


module.exports = {popularList, popularId, popularByMonth, popularByTown};