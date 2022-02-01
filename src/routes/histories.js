const histories = require('express').Router();

const {getHistories, getHistory, addHistories, updateHistory, deleteHistory} = require('../controller/histories');

histories.get('/', getHistories);
histories.get('/:id', getHistory);
histories.post('/', addHistories);
histories.patch('/:id', updateHistory);
histories.patch('/', updateHistory);
histories.delete('/:id', deleteHistory);
histories.delete('/', deleteHistory);

module.exports = histories;