const express = require('express');
// const mysql = require("mysql");
// const Connection = require('mysql/lib/Connection');
const app = express();

const fs = require('fs');
var path = require('path')

var nodemailer = require('nodemailer');


const cors = require('cors');

app.use(cors({origin: '*'}));
app.use(express.json());

function readJSON(fileName) {
    console.log("poopy stink")
    readFile(fileName + '.JSON', 'utf-8', (err, jsonString) => {
        if (err) {
            console.log(err);
        } else {
            try {
                const data = JSON.parse(jsonString);
                console.log(data)
                return data;
            } catch (err) {
                console.log("Error parsing JSON", err);
                return err;
            }
        }
    })
}


app.get('/getData/:fileName', (req, res) => {
    data = JSON.parse(fs.readFileSync("../data/" + req.params.fileName + ".JSON", 'utf8'));
    console.log('received from client: ' + req.query.first_piece_approval)
    data = JSON.stringify(data);
    dataLength = data.length;
    
    res.send(data);
});

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

    //send email
    var transporter = nodemailer.createTransport({
        
        service: 'gmail',
        auth: {
            user: 'plasticmailer2022@gmail.com',
            pass: "Plastic2022!"
        },
        tls: {
            secureProtocol: "TLSv1_method"
        }
    });
//jason.bean_ext@plasticomnium.com
    var mailOptions = {
        from: 'plasticmailer2022@gmail.com',
        to: 'jasonb0820@gmail.com',
        subject: "This is a node.js test!",
        text: 'Success!'
    };

    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log("email error ")
            console.log(error);
        }else {
            console.log('email sent: ' + info.response);
        }
    })



});

app.post('/setupStabilizeComplete', (req, res) => {
    console.log("write file")
    let currDate = new Date().toLocaleDateString();
    const date = (currDate).split('/');
    const parsedDate = date[0] + date[1] + date[2];
    const shift = req.body.shift;
    const pressNum = req.body.pressNum;
    var data = {}
    data.first_piece_approval = []
    data.setup_stabilize_complete = []
    const processTechData = {
        initial: req.body.initial,
        q1: req.body.q1,
        q2: req.body.q2,
        q3: req.body.q3,
        q4: req.body.q4,
        q5: req.body.q5,
        q6: req.body.q6,
    };

    //get data from last step
    let prevData = JSON.parse(fs.readFileSync("../data/" + req.body.fileName + ".JSON", 'utf-8'))

    console.log(prevData)
    
    data.first_piece_approval.push(prevData.first_piece_approval[0])
    data.setup_stabilize_complete.push(processTechData)

    console.log(data)

    fs.writeFileSync("../data/" + req.body.fileName + ".JSON", JSON.stringify(data));

    
});

app.post('/hotCheck', (req, res) => {
    console.log("write file hot check")
    let currDate = new Date().toLocaleDateString();
    const date = (currDate).split('/');
    const parsedDate = date[0] + date[1] + date[2];

    var data = {}
    data.first_piece_approval = []
    data.setup_stabilize_complete = []
    data.hotCheck = []
    const hotCheckData = {
        partNum: req.body.partNum,
        initial: req.body.initial,
        q1: req.body.q1,
        zone1: req.body.zone1,
        above: req.body.above,
        zone2: req.body.zone2,
        below: req.body.below,
    };

    //get data from last step
    let prevData = JSON.parse(fs.readFileSync("../data/" + req.body.fileName + ".JSON", 'utf-8'))

    console.log(prevData)
    
    data.first_piece_approval.push(prevData.first_piece_approval[0])
    data.setup_stabilize_complete.push(prevData.setup_stabilize_complete[0])
    data.hotCheck.push(hotCheckData)

    console.log(data)

    fs.writeFileSync("../data/" + req.body.fileName + ".JSON", JSON.stringify(data));
})

app.post('/completeInitial1stPieceTesting', (req, res) => {
    console.log("write file hot check")
    let currDate = new Date().toLocaleDateString();
    const date = (currDate).split('/');
    const parsedDate = date[0] + date[1] + date[2];

    var data = {}
    data.first_piece_approval = []
    data.setup_stabilize_complete = []
    data.hotCheck = []
    data.completeInitial1stPieceTesting = []
    const completeInitial1stPieceTesting = {
        initial: req.body.initial,
        partNum: req.body.partNum,
        q1: req.body.q1,
        q2: req.body.q2,
        q3: req.body.q3,
        q4: req.body.q4,
        q5: req.body.q5,
        tank1: req.body.tank1,
        q6: req.body.q6,
        tank2: req.body.tank2,
        q7: req.body.q7,
    };

    //get data from last step
    let prevData = JSON.parse(fs.readFileSync("../data/" + req.body.fileName + ".JSON", 'utf-8'))

    console.log(prevData)
    
    data.first_piece_approval.push(prevData.first_piece_approval[0])
    data.setup_stabilize_complete.push(prevData.setup_stabilize_complete[0])
    data.hotCheck.push(prevData.hotCheck[0])
    data.completeInitial1stPieceTesting.push(completeInitial1stPieceTesting)

    console.log(data)

    fs.writeFileSync("../data/" + req.body.fileName + ".JSON", JSON.stringify(data));
})

app.post('/completeRemainingTesting', (req, res) => {
    console.log("write file crt check")
    let currDate = new Date().toLocaleDateString();
    const date = (currDate).split('/');
    const parsedDate = date[0] + date[1] + date[2];

    var data = {}
    data.first_piece_approval = []
    data.setup_stabilize_complete = []
    data.hotCheck = []
    data.completeInitial1stPieceTesting = []
    data.completeRemainingTesting = []
    const completeRemainingTesting = {
        q1: req.body.q1,
        q2: req.body.q2,
        q3: req.body.q3,
        q4: req.body.q4,
    };

    //get data from last step
    let prevData = JSON.parse(fs.readFileSync("../data/" + req.body.fileName + ".JSON", 'utf-8'))

    console.log(prevData)
    
    data.first_piece_approval.push(prevData.first_piece_approval[0])
    data.setup_stabilize_complete.push(prevData.setup_stabilize_complete[0])
    data.hotCheck.push(prevData.hotCheck[0])
    data.completeInitial1stPieceTesting.push(prevData.completeInitial1stPieceTesting[0])
    data.completeRemainingTesting.push(completeRemainingTesting)

    console.log(data)

    fs.writeFileSync("../data/" + req.body.fileName + ".JSON", JSON.stringify(data));
})

app.listen('3000', () => {
    console.log('Listening on port 3000')
})