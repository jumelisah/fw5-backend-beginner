const { urlencoded } = require('express')
const express = require ('express')

const app = express()

app.use(express.urlencodec({extended : true}))

app.listen(8000, ()=>{
    console.log('App listening on port 8000')
})