const histories = require('express').Router();

const { getHistories, getHistory, addHistory, updateHistory, getUserHistories, deleteHistoryUser } = require('../controller/histasync');
const { verifyUser } = require('../helpers/auth');

histories.get('/', verifyUser, getHistories);
histories.get('/user', verifyUser, getUserHistories);
histories.get('/:id', verifyUser, getHistory);
histories.post('/', verifyUser, addHistory);
histories.patch('/:id', verifyUser, updateHistory);
histories.patch('/', verifyUser, updateHistory);
histories.patch('/delete/user/:id', verifyUser, deleteHistoryUser);

module.exports = histories;