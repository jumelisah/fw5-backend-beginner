const histories = require('express').Router();

const { getHistories, getHistory, addHistory, updateHistory, deleteHistory, getUserHistories } = require('../controller/histasync');
const { verifyUser } = require('../helpers/auth');

histories.get('/', verifyUser, getHistories);
histories.get('/user', verifyUser, getUserHistories);
histories.get('/:id', verifyUser, getHistory);
histories.post('/', verifyUser, addHistory);
histories.patch('/:id', verifyUser, updateHistory);
histories.patch('/', verifyUser, updateHistory);
histories.delete('/:id', verifyUser, deleteHistory);
histories.delete('/', verifyUser, deleteHistory);

module.exports = histories;