const express = require ('express');

const app = express();

app.use(express.urlencoded({extended : true}));

app.use(require('./src/routes'));

app.listen(8000, ()=>{
  console.log('App listening on port 8000');
});