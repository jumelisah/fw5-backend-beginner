const express = require ('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const options = {
  'origin': '*',
  'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
  'preflightContinue': false,
  'optionsSuccessStatus': 204
};

app.use(express.urlencoded({extended : true}));

app.use(cors(options));
app.use(require('./src/routes'));
app.use('/uploads', express.static('uploads'));

const APP_PORT = process.env.PORT || 8000;

app.listen(APP_PORT, ()=>{
  console.log(`App listening on port ${APP_PORT}`);
});