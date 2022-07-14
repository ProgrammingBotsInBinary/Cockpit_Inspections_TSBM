const express = require('express');
const mysql = require("mysql");
const Connection = require('mysql/lib/Connection');
const app = express();

const cors = require('cors');

app.use(cors({origin: '*'}));
app.use(express.json());


// const port = 3001
// app.listen(port, () => console.log('listening on port ' + port));
// app.use(express.static('public'));

//create Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'partlist'
})

//connect to MySQL
db.connect(err => {
    if(err) {
        throw err
    }
    console.log('Connected to MySQL')
})

//Create db
app.get('/createdb', (req, res) => {
    let sql = 'CREATE DATABASE partlist';
    db.query(sql, (err) => {
        if(err){
            throw err;
        }
        res.send("Database Created");
    });
});

//Create Table
app.get('/createTable', (req, res) => {
    let sql = 'CREATE TABLE parts(id int AUTO_INCREMENT, line int, station VARCHAR(20), part VARCHAR(255), description VARCHAR(2024), date VARCHAR(10), time VARCHAR(10), signature VARCHAR(25), PRIMARY KEY(id))'
    db.query(sql, err => {
        if(err) {
            throw err
        }
        res.send('Part table created')
    })
})

//Insert Part manually
// app.get('/addpart', (req, res) => {
//     let post = {line: 401, station: 'ASY01', part: 'hammer', description: 'Its hammer time'}
//     let sql = 'INSERT INTO parts SET ?'
//     let query = db.query(sql, post, err => {
//         if(err) {
//             throw err
//         }
//         res.send('Part added')
//     })
// })

//Insert post request
app.post('/addpart', (req, res) => {
    console.log("post called \n")
    console.log("post inserting " + parseInt(req.body.line) + " " + req.body.station + " " + req.body.part + " " + req.body.desc + " " + req.body.date + '\n')
    let post = {line: req.body.line, station: req.body.station, part: req.body.part, description: req.body.desc, date: req.body.date, time: req.body.time, signature: req.body.signature}
    let sql = 'INSERT INTO parts SET ?'
    let query = db.query(sql, post, err => {
        if(err) {
            throw err
        }
        res.send('Part added')
    })
})

//select part
app.get('/getpart/:line/:station', (req, res) => {

    let sql;
    console.log("line = " + req.params.line + "station = " + req.params.station)
    if(req.params.station === "ALL"){
        sql = 'SELECT * FROM parts WHERE line = ' + req.params.line + ' ORDER BY station';
    } else {
        sql = 'SELECT * FROM parts WHERE line = ' + req.params.line + ' && station = "' + req.params.station + '"';
    }
    let query = db.query(sql, (err, results) => {
        if(err) {
            throw err
        }
        console.log(results)
        res.send(results)
    })
})

//return full list
app.get('/getpart', (req, res) => {

    let sql = 'SELECT * FROM parts ORDER BY line'

    let query = db.query(sql, (err, results) => {
        if(err) {
            throw err
        }
        console.log(results)
        res.send(results)
    })
})

//update part
app.get('/updatepart/:id', (req, res) => {
    let newPart = 'Updated part'
    let sql = `UPDATE parts SET part = '${newPart}' WHERE id = ${req.params.id}`
    let query = db.query(sql, err => {
        if(err) {
            throw err
        }
        res.send('Employee updated')
    })
})

//delete part
app.get('/deletepart/:id', (req, res) => {
    let sql = `DELETE FROM parts WHERE id = ${req.params.id}`
    let query = db.query(sql, err => {
        if(err) {
            throw err
        }
        res.send('Employee deleted')
    })
})

// app.delete('/deletepart', (req, res) => {
//     let sql = `DELETE FROM parts WHERE id = ${req.body.id}`
//     let query = db.query(sql, err => {
//         if(err) {
//             throw err
//         }
//         res.send('Part deleted')
//     })
// })

app.listen('3000', () => {
    console.log('Listening on port 3000')
})