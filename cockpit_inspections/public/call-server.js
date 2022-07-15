//website for helping get local host site across other comps
//https://stackoverflow.com/questions/5524116/accessing-localhost-xampp-from-another-computer-over-lan-network-how-to

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

function handleFetchExistingButton() {
    let pressSelect = document.getElementById('line')
    let pressValue = lineSelect.options[lineSelect.selectedIndex].text

    let shiftSelect = document.getElementById('shift')
    let shiftValue = shiftSelect.options[shiftSelect.selectedIndex].text

    let currDate = new Date().toLocaleDateString();
    const date = (currDate).split('/');
    const parsedDate = date[0] + date[1] + date[2];

    const url = "http://localhost:3500/users/";

    let fileName = "s" + shiftValue + 'd' + parsedDate + 'p' + pressValue;

    const fetchObject = {
        method: 'GET',
        headers: {
            'Content-Type' : 'text/html'
        }
    };

    fetch(url + fileName, fetchObject)
        .then(response => response.json())
        .then(jsonObject => {
            console.log(jsonObject);
        })

}

function start() {
    const submitButton = document.querySelector('#submitBtn');
    const fetchExistingButton = document.querySelector('#fetchBtn')

    submitButton.onclick = handleSubmitButtonWrite;
    fetchExistingButton.onClick = handleFetchExistingButton;
}



window.onload = start;