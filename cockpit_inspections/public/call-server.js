//website for helping get local host site across other comps
//https://stackoverflow.com/questions/5524116/accessing-localhost-xampp-from-another-computer-over-lan-network-how-to


function handleViewButton(){
    console.log("View clicked");

    const url = "http://localhost:3000";
    let lineSelect = document.getElementById('line')
    let lineValue = lineSelect.options[lineSelect.selectedIndex].text

    let stationSelect = document.getElementById('station')
    let stationValue = stationSelect.options[stationSelect.selectedIndex].text

    let sortBy = document.getElementById('sort')
    let sortByValue = sortBy.options[stationSelect.selectedIndex].text

    const fetchObject = {
        method: 'GET',
        headers: {
            'Content-Type' : 'text/html'
        }
    };
    console.log(url + "/getpart/" + lineValue + "/" + stationValue)
    fetch(url + "/getpart/" + lineValue + "/" + stationValue, fetchObject)
        .then(res => res.json())
        .then(
            data => {console.log(data)
            fillTable(data)
            });

}

function handleViewAllButton(){
    console.log("View All clicked");

    const url = "http://localhost:3000";

    const fetchObject = {
        method: 'GET',
        headers: {
            'Content-Type' : 'text/html'
        }
    };
    console.log(url + "/getpart/")
    fetch(url + "/getpart/", fetchObject)
        .then(res => res.json())
        .then(
            data => {console.log(data)
            fillTable(data)
            });
}

function handleAddButton(){
    console.log("add button clicked");

    let lineSelect = document.getElementById('addLine')
    let lineValue = lineSelect.options[lineSelect.selectedIndex].text

    let stationSelect = document.getElementById('addStation')
    let stationValue = stationSelect.options[stationSelect.selectedIndex].text

    let partInput = document.getElementById('partName')
    let partName = partInput.value

    let descriptionInput = document.getElementById('partDescription')
    let description = descriptionInput.value

    let currDate = new Date().toLocaleDateString();
    let currTime = new Date().toLocaleTimeString();

    let signatureInput = document.getElementById('personSignature')
    let signatureValue = signatureInput.value

    console.log("date = " + currDate);
    console.log("Add " + lineValue + " " + stationValue + " " + partName + " " + description)

    const url = "http://localhost:3000/addpart";

    const dataObject = {
        line: lineValue,
        station: stationValue,
        part: partName,
        desc: description,
        date: currDate,
        time: currTime,
        signature: signatureValue
    }

    console.log("line = " + JSON.stringify(dataObject).line)
    console.log('\n')

    const fetchObject = {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(dataObject)
    };
    console.log(url + lineValue + "/" + stationValue + "/" + partName + "/" + description)
    fetch(url, fetchObject)
        .then(res => res.json())
        .then(jsonObject => {
            console.log("jsonObject.line = " + jsonObject.line)
            console.log('\n')
        }
            );
}

function handleDeleteButton(id){
    console.log(id);

    const url = "http://localhost:3000/deletepart/"

    if(confirm("Are you sure you want to delete? Deleted items can't be recovered.")){
        const fetchObject = {
            method: 'GET',
            headers: {
                'Content-Type' : 'text/html'
            },
        };
    
        fetch(url + id, fetchObject)
    }
    
}

function fillTable(data) {
    
    const table = document.getElementById("logsTable");

    if(table.rows.length > 1){
        clearTable()
    }

    data.forEach( item => {
        let row = table.insertRow();
        let line = row.insertCell(0);
        line.innerHTML = item.line;
        let station = row.insertCell(1);
        station.innerHTML = item.station;
        let part = row.insertCell(2);
        part.innerHTML = item.part;
        let desc = row.insertCell(3);
        desc.innerHTML = item.description;

        let dateRow = row.insertCell(4);
        dateRow.innerHTML = item.date;

        let timeRow = row.insertCell(5);
        timeRow.innerHTML = item.time;

        let signature = row.insertCell(6);
        signature.innerHTML = item.signature;

        let deleteItem = row.insertCell(7);
        deleteBtn = document.createElement("button")
        deleteBtn.id = item.id
        deleteBtn.innerHTML = "delete"
        deleteBtn.onclick = function() {
            console.log("delete clicked \n")
            handleDeleteButton(item.id)
        };
        deleteItem.appendChild(deleteBtn)

        //who needs to edit anyway
        // let editItem = row.insertCell(4);
        // editBtn = document.createElement("button")
        // editBtn.innerHTML = "edit"
        // editItem.appendChild(editBtn)
    })
}

function clearTable() {
    const table = document.getElementById("partsTable");
    var rowCount = table.rows.length;
    console.log("clear table row count = " + rowCount)
    for(var i = rowCount - 1; i > 0; i--){
        table.deleteRow(i);
    }
}

function handleSubmitButtonWrite() {
    console.log("submit button clicked");
    
    const url = "http://localhost:3000/add1stPieceApprovalProcess"

    let initialsSelect = document.getElementById('initials')
    let initialValue = initialsSelect.options[initialsSelect.selectedIndex].text

    let shiftSelect = document.getElementById('shift')
    let shiftValue = shiftSelect.options[shiftSelect.selectedIndex].text

    let pressSelect = document.getElementById('press')
    let pressValue = pressSelect.options[pressSelect.selectedIndex].text

    let cavitySelect = document.getElementById('cavity')
    let cavityValue = cavitySelect.options[cavitySelect.selectedIndex].text

    let partName = document.getElementById('partName')
    let partNameValue = partName.value

    let currDate = new Date().toLocaleDateString();
    let currTime = new Date().toLocaleTimeString();

    let moldSet = document.getElementById('moldSet')
    let moldSetValue = moldSet.value

    let purgeIn = document.getElementById('purgeIn')
    let purgeInValue = purgeIn.value

    let down8 = document.getElementById('down8')
    let down8Value = down8.value

    let processChange = document.getElementById('processChange')
    let processChangeValue = processChange.value

    const dataObject = {
        initial: initialValue,
        shift: shiftValue,
        pressNum: pressValue,
        cavityNum: cavityValue,
        part: partNameValue,
        date: currDate,
        time: currTime,
        moldSet: moldSetValue,
        purgeIn: purgeInValue,
        down8: down8Value,
        processChange: processChangeValue,
    }

    const fetchObject = {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(dataObject)
    }

    console.log(url)
    fetch(url, fetchObject)
        .then(response => response.json())
        .then(jsonObject => {
            console.log("fetch")
            console.log(jsonObject);
        });

}

function handleFetchExistingButton() {
    let initialsSelect = document.getElementById('initials')
    let initialValue = initialsSelect.options[initialsSelect.selectedIndex].text
}

function start() {
    const submitButton = document.querySelector('#submitBtn');
    const fetchExistingButton = document.querySelector('#fetchBtn')

    submitButton.onclick = handleSubmitButtonWrite;
    fetchExistingButton.onClick = handleFetchExistingButton;
}



window.onload = start;