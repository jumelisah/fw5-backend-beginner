const categories = require('express').Router();

const {getCategories, getCategory, addCategory, updateCategory, deleteCategory} = require('../controller/categories');

categories.get('/', getCategories);
categories.get('/:id', getCategory);
categories.post('/', addCategory);
categories.patch('/:id', updateCategory);
categories.delete('/:id', deleteCategory);

module.exports = categories;