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


    //https://ourcodeworld.com/articles/read/264/how-to-send-an-email-gmail-outlook-and-zoho-using-nodemailer-in-node-js
    //send email
    var transporter = nodemailer.createTransport({
        host: "smtp-mail.outlook.com",
        secureConnection: false,
        port: 587,
        tls: {
            ciphers: 'SSLv3'
        },
        auth: {
            user: 'cockpitInspection2022@outlook.com',
            pass: "Plastic2022!"
        },
        
    });
//jason.bean_ext@plasticomnium.com
    var mailOptions = {
        from: 'cockpitInspection2022@outlook.com',
        to: 'jasonb0820@gmail.com',
        subject: "This is a node.js test!",
        text: 'Success!'
    };

    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log("email error ", error)
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

app.post('/reviewAndSignOff', (req, res) => {
    console.log("write file reviewandsignoff")
    let currDate = new Date().toLocaleDateString();
    const date = (currDate).split('/');
    const parsedDate = date[0] + date[1] + date[2];

    var data = {}
    data.first_piece_approval = []
    data.setup_stabilize_complete = []
    data.hotCheck = []
    data.completeInitial1stPieceTesting = []
    data.reviewAndSignOff = []
    const reviewAndSignOff = {
        q1: req.body.q1,
        qualTechSignature: req.body.qualTechSignature,
    };
    console.log(reviewAndSignOff);

    //get data from last step
    let prevData = JSON.parse(fs.readFileSync("../data/" + req.body.fileName + ".JSON", 'utf-8'))

    //console.log(prevData)
    
    data.first_piece_approval.push(prevData.first_piece_approval[0])
    data.setup_stabilize_complete.push(prevData.setup_stabilize_complete[0])
    data.hotCheck.push(prevData.hotCheck[0])
    data.completeInitial1stPieceTesting.push(prevData.completeInitial1stPieceTesting[0])
    data.reviewAndSignOff.push(reviewAndSignOff)

    console.log("new data = \n")
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
    data.reviewAndSignOff = []
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
    data.reviewAndSignOff.push(prevData.reviewAndSignOff[0])
    data.completeRemainingTesting.push(completeRemainingTesting)

    console.log(data)

    fs.writeFileSync("../data/" + req.body.fileName + ".JSON", JSON.stringify(data));
})

app.post('/reaction1stInspectionFail', (req, res) => {
    console.log("write file crt check")
    let currDate = new Date().toLocaleDateString();
    const date = (currDate).split('/');
    const parsedDate = date[0] + date[1] + date[2];

    var data = {}
    data.first_piece_approval = []
    data.setup_stabilize_complete = []
    data.hotCheck = []
    data.completeInitial1stPieceTesting = []
    data.reviewAndSignOff = []
    data.completeRemainingTesting = []
    data.reaction1stInspectionFail = []
    const reaction1stInspectionFail = {
        initial: req.body.initial,
        q1: req.body.q1,
    };

    //get data from last step
    let prevData = JSON.parse(fs.readFileSync("../data/" + req.body.fileName + ".JSON", 'utf-8'))

    console.log(prevData)
    
    data.first_piece_approval.push(prevData.first_piece_approval[0])
    data.setup_stabilize_complete.push(prevData.setup_stabilize_complete[0])
    data.hotCheck.push(prevData.hotCheck[0])
    data.completeInitial1stPieceTesting.push(prevData.completeInitial1stPieceTesting[0])
    data.reviewAndSignOff.push(prevData.reviewAndSignOff[0])
    data.completeRemainingTesting.push(prevData.completeRemainingTesting[0])
    data.reaction1stInspectionFail.push(reaction1stInspectionFail)


    console.log(data)

    fs.writeFileSync("../data/" + req.body.fileName + ".JSON", JSON.stringify(data));
})






app.listen('3000', () => {
    console.log('Listening on port 3000')
})