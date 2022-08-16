//website for helping get local host site across other comps
//https://stackoverflow.com/questions/5524116/accessing-localhost-xampp-from-another-computer-over-lan-network-how-to

//import {readJSON} from "../index.js"

function checkStatus() {
    let pressValue = 401
    let shiftValue = 1
    let currDate = new Date().toLocaleDateString();
    const date = (currDate).split('/');
    const parsedDate = date[0] + date[1] + date[2];

    const url = "http://localhost:3000/getData/";

    const span = document.getElementById('current')
    console.log('bruh')

    if("../data/"){
        const fetchObject = {
            method: 'GET',
            headers: {
                'Content-Type' : 'text/html'
            }
        };
        
            fetch(url, fetchObject)
            .then(response => response.json())
            .then(jsonObject => {
                fillTableData(jsonObject);
            })
    }

    // for(let i = 0; i < 8; i++){
    //     for(let j = 0; j < 3; j++){
    //         let fileName = "s" + shiftValue + 'd' + parsedDate + 'p' + pressValue;
    //         console.log("File name = " + fileName + " , seeking url => " + url + fileName)
    
    //     // let data = readJSON(fileName);
    //     // console.log("data recived: \n" + data)
        
    //         if("../data/"){
    //             const fetchObject = {
    //                 method: 'GET',
    //                 headers: {
    //                     'Content-Type' : 'text/html'
    //                 }
    //             };
                
    //                 fetch(url, fetchObject)
    //                 .then(response => response.json())
    //                 .then(jsonObject => {
    //                     fillTable(jsonObject);
    //                 })
    //         }else {
    //             console.log("file not found")
    //         }
    //         shiftValue++;
    //     }
    //     shiftValue = 1;
    //     pressValue++;
    // }
    
    

}

function getTableData(files) {

    console.log("get table data: files to check = " + data)


    const fetchObject = {
        method: 'GET',
        headers: {
            'Content-Type' : 'text/html'
        }
    };
    
        fetch(url, fetchObject)
        .then(response => response.json())
        .then(jsonObject => {
            fillTable(jsonObject);
        })
}

function fillTable(data) {
    
    const table = document.getElementById("logsTable");

    console.log(data)


    if(table.rows.length > 1){
        clearTable()
    }

    data.forEach( item => {
        let row = table.insertRow();
        let date = row.insertCell(0);
        date.innerHTML = item.date;
        let shift = row.insertCell(1);
        shift.innerHTML = item.shift;
        let press = row.insertCell(2);
        press.innerHTML = item.pressNum;
        let next = row.insertCell(3);
        next.innerHTML = item.description;
        let responsibility = row.insertCell(4);
        responsibility.innerHTML = item.responsibility;

        let dateRow = row.insertCell(4);
        dateRow.innerHTML = item.date;

        let timeRow = row.insertCell(5);
        timeRow.innerHTML = item.time;

        let signature = row.insertCell(6);
        signature.innerHTML = item.signature;

        // let deleteItem = row.insertCell(7);
        // deleteBtn = document.createElement("button")
        // deleteBtn.id = item.id
        // deleteBtn.innerHTML = "delete"
        // deleteBtn.onclick = function() {
        //     console.log("delete clicked \n")
        //     handleDeleteButton(item.id)
        // };
        // deleteItem.appendChild(deleteBtn)

        //who needs to edit anyway
        // let editItem = row.insertCell(4);
        // editBtn = document.createElement("button")
        // editBtn.innerHTML = "edit"
        // editItem.appendChild(editBtn)
    })
}

function clearTable() {
    console.log("fetch")
    const table = document.getElementById("partsTable");
    var rowCount = table.rows.length;
    console.log("clear table row count = " + rowCount)
    for(var i = rowCount - 1; i > 0; i--){
        table.deleteRow(i);
    }
}

function handleFetchExistingButton() {
    console.log("fetch pressed");
    let pressSelect = document.getElementById('line')
    let pressValue = pressSelect.options[pressSelect.selectedIndex].text

    let shiftSelect = document.getElementById('shift')
    let shiftValue = shiftSelect.options[shiftSelect.selectedIndex].text

    //can only fetch existing if it is from the same date
    let currDate = new Date().toLocaleDateString();
    const date = (currDate).split('/');
    const parsedDate = date[0] + date[1] + date[2];

    const url = "http://localhost:3000/getData/";

    let fileName = "s" + shiftValue + 'd' + parsedDate + 'p' + pressValue;
    console.log("File name = " + fileName + " , seeking url => " + url + fileName)

    // let data = readJSON(fileName);
    // console.log("data recived: \n" + data)
    
    if("../data/" + fileName){
        console.log("file: " + fileName + " found");
        let fileData
        const fetchObject = {
            method: 'GET',
            headers: {
                'Content-Type' : 'text/html'
            }
        };
        
            fetch(url + fileName, fetchObject)
            .then(response => response.json())
            .then(jsonObject => {
                //findNextStage(JSON.stringify(jsonObject));
                findNextStage(jsonObject)
                //console.log(jsonObject);
            })
            
            //console.log(JSON.stringify(fileData))
           
        // let stage = fileData.length;
        // console.log(stage);
        
    } else {
        console.log("error file does not exist");
    }

}

function findNextStage(data){

    let currDate = new Date().toLocaleDateString();
    const date = (currDate).split('/');
    const parsedDate = date[0] + date[1] + date[2];
    let pressSelect = document.getElementById('line')
    let pressValue = pressSelect.options[pressSelect.selectedIndex].text
    let shiftSelect = document.getElementById('shift')
    let shiftValue = shiftSelect.options[shiftSelect.selectedIndex].text

    let fileName = "s" + shiftValue + 'd' + parsedDate + 'p' + pressValue;

    //data = JSON.parse(data)
    console.log(data.first_piece_approval);
    if(!data.setup_stabilize_complete){
        localStorage.setItem("fileName", fileName)
        window.location.href = "setup_stabilize_complete.html"
    }else if(!data.hotCheck){
        localStorage.setItem("fileName", fileName)
        window.location.href = "hot_check.html"
    }else if(data.hotCheck && !data.completeInitial1stPieceTesting){
        localStorage.setItem("fileName", fileName)
        window.location.href = "complete_initial_1st_piece_testing.html"
    }else if(data.completeInitial1stPieceTesting && !data.reviewAndSignOff){
        localStorage.setItem("fileName", fileName)
        window.location.href = "review_and_sign_off.html"
    }else if(data.reviewAndSignOff && !data.completeRemainingTesting){
        localStorage.setItem("fileName", fileName)
        window.location.href = "complete_remaining_testing.html"
    } // need review / sign off 2

    else if(data.completeRemainingTesting && !data.reaction1stInspectionFail){
        localStorage.setItem("fileName", fileName)
        window.location.href = "reaction_1st_inspection_fail"
    }else if(data.reaction1stInspectionFail && !data.final){
        console.log("ayo wtf")
        localStorage.setItem("fileName", fileName)
        window.location.href = "final_document.html"
    }
}

function handleAustinsBtn() {
    window.location.href = "reaction_1st_inspection_fail.html"
}

function handleNoahBtn() {
    window.location.href = "review_and_sign_off.html"
}

function handleMailBtn(){
    const url = "http://localhost:3000/sendMail/";

    const fetchObject = {
            method: 'GET',
            headers: {
                'Content-Type' : 'text/html'
            }
        };
        
            fetch(url, fetchObject)
            .then(response => response.json())
            .then(jsonObject => {
                //findNextStage(JSON.stringify(jsonObject));
                findNextStage(jsonObject)
                //console.log(jsonObject);
            })
}

function start() {
    console.log("in start")
    const fetchExistingButton = document.querySelector('#fetchExistingBtn')
    const checkStatusButton = document.querySelector("#checkStatusBtn")
    const austinsBtn = document.querySelector('#austin')
    const noahBtn = document.querySelector('#noah')
    const mailBtn = document.querySelector('#mail')

    checkStatusButton.onclick = checkStatus;

    fetchExistingButton.onclick = handleFetchExistingButton;
    austinsBtn.onclick = handleAustinsBtn;
    noahBtn.onclick = handleNoahBtn;
    mailBtn.onclick = handleMailBtn;
}

window.onload = start;