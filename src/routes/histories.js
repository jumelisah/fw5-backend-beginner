const histories = require('express').Router();

const { getHistories, getHistory, addHistory, getUserHistories, deleteHistoryUser, editHistoryStatus, deleteHistoryAdmin } = require('../controller/histasync');
const { verifyUser } = require('../helpers/auth');

histories.get('/', verifyUser, getHistories);
histories.get('/user', verifyUser, getUserHistories);
histories.get('/:id', verifyUser, getHistory);
histories.post('/', verifyUser, addHistory);
histories.patch('/:id', verifyUser, editHistoryStatus);
histories.patch('/delete/:id', verifyUser, deleteHistoryAdmin);
histories.patch('/delete/user/:id', verifyUser, deleteHistoryUser);

module.exports = histories;