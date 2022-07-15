const express = require('express');
// const mysql = require("mysql");
// const Connection = require('mysql/lib/Connection');
const app = express();

const fs = require('fs');
var path = require('path')


const cors = require('cors');

app.use(cors({origin: '*'}));
app.use(express.json());


// const port = 3001
// app.listen(port, () => console.log('listening on port ' + port));
// app.use(express.static('public'));

//create Connection
// const db = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'cockpit_inspections'
// })

//connect to MySQL
// db.connect(err => {
//     if(err) {
//         throw err
//     }
//     console.log('Connected to MySQL')
// })

//Create db
// app.get('/createdb', (req, res) => {
//     let sql = 'CREATE DATABASE partlist';
//     db.query(sql, (err) => {
//         if(err){
//             throw err;
//         }
//         res.send("Database Created");
//     });
// });

//Create Table
// app.get('/createTable', (req, res) => {
//     let sql = 'CREATE TABLE parts(id int AUTO_INCREMENT, line int, station VARCHAR(20), part VARCHAR(255), description VARCHAR(2024), date VARCHAR(10), time VARCHAR(10), signature VARCHAR(25), PRIMARY KEY(id))'
//     db.query(sql, err => {
//         if(err) {
//             throw err
//         }
//         res.send('Part table created')
//     })
// })

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
// app.post('/add1stPieceApprovalProcess', (req, res) => {
//     console.log("post called \n")
//     //console.log("post inserting " + parseInt(req.body.line) + " " + req.body.station + " " + req.body.part + " " + req.body.desc + " " + req.body.date + '\n')
//     let post = {Supervisors_initials: req.body.initial, time: req.body.time, date: req.body.date, shift: req.body.shift, Press_num: req.body.pressNum, Cavity_num: req.body.cavityNum, Part_name: req.body.part, Mold_set: req.body.moldSet, Purge_in: req.body.purgeIn, Down_8hrs: req.body.down8, Process_change: req.body.processChange}
//     let sql = 'INSERT INTO 1st_piece_approval SET ?'
//     let query = db.query(sql, post, err => {
//         if(err) {
//             throw err
//         }
//         res.send('Part added')
//     })
// })

app.post('/add1stPieceApprovalProcess', (req, res) => {
    console.log("write file")
    const date = (req.body.date).split('/');
    const parsedDate = date[0] + date[1] + date[2];
    const shift = req.body.shift;
    const pressNum = req.body.pressNum;
    var data = {}
    data.first_piece_approval = []
    const supervisorData = {
        initial: req.body.initial,
        shift: req.body.shift,
        pressNum: req.body.pressNum,
        cavityNum: req.body.cavityNum,
        part: req.body.part,
        date: req.body.date,
        time: req.body.time,
        moldSet: req.body.moldSet,
        purgeIn: req.body.purgeIn,
        down8: req.body.down8,
        processChange: req.body.processChange,
    };
    data.first_piece_approval.push(supervisorData)
    console.log("data/" + "s" + shift + "d" + parsedDate + ".JSON")
    fs.writeFileSync("../data/" + "s" + shift + "d" + parsedDate + "p" + pressNum + ".JSON", JSON.stringify(data));
});

app.listen('3000', () => {
    console.log('Listening on port 3000')
})