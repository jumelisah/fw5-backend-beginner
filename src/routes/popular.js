const popular = require('express').Router();

const {popularList} = require('../controller/popular');

popular.get('/', popularList);

module.exports = popular;