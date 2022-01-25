const express = require('express')
const mysql = require('mysql')
const app = express()

const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'vehicle_rent'
})

app.use(express.urlencoded({extended:true}))

// connection.connect((err) => {
//     if (err) {
//       console.log('error connecting: ' + err.stack);
//       return;
//     }
//     console.log('success');
// });

const dataVehicle = []

app.get('/', (req, res)=>{
    connection.query(
        'SELECT * FROM vehicle',
        (error, results) => {
          results.forEach(element=>{
              dataVehicle.push(element)
          })
        }
    )
    return res.json({
        success: true,
        message: "Backend is running well"
    })
})

app.get('/list', (req,res)=>{
    return res.json({
        success: true,
        message: `LIST OF VEHICLE : ${dataVehicle.length} DATA`,
        data: dataVehicle
    })
    
})

app.post('/add', (req,res)=>{
    const id = dataVehicle.length
    connection.query(
        'INSERT INTO vehicle (name, release_year, type, seat, fuel_capacity, engine_capacity, class) VALUES (?,?,?,?,?,?,?)',
        [req.body.name, req.body.release_year, req.body.type, req.body.seat, req.body.fuel_capacity, req.body.engine_capacity, req.body.class], (error, results)=>{
            console.log("success")
            console.log(results)
        }
    )
    return res.json({
        success: true,
        message: "Register success",
        data: dataVehicle[id]
    })
})

app.delete('/delete/:id', (req, res)=>{
    connection.query(
        'DELETE FROM vehicle WHERE id = ?', [req.params.id],
        (error,results)=>{
            console.log("success delete")
        }
    )
    return res.json({
        success: true,
        message: "Delete Vehicle"
    })
})

app.listen(8000, ()=>{
    console.log("App running on Port 3000")
})