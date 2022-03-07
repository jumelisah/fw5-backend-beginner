const express = require ('express');
const cors = require('cors');
require('dotenv').config();
const app = express();

app.use(express.urlencoded({extended : true}));

app.use(cors());

app.use(require('./src/routes'));
app.use('/uploads', express.static('uploads'));

const APP_PORT = process.env.PORT || 8000;

app.listen(APP_PORT, ()=>{
  console.log(`App listening on port ${APP_PORT}`);
});