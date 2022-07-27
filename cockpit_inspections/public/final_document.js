function fillFileds(data){
    console.log(data)
    
    //first piece inspection

    console.log(data[0])

    document.getElementById('initials').value = data.first_piece_approval[0].initial

    document.getElementById('shift').value = data.first_piece_approval[0].shift
   
    document.getElementById('press').value = data.first_piece_approval[0].pressNum

    document.getElementById('cavity').value = data.first_piece_approval[0].cavityNum

    document.getElementById('partName').value = data.first_piece_approval[0].part

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

    //setup stabilize complete
    document.getElementById('processTechInitials').value = data.setup_stabilize_complete[0].initial

    var valueQ1 = data.setup_stabilize_complete[0].q1
    console.log("ValueQ1 = " + valueQ1)
    document.querySelector(`input[name=ProcessTech_options1][value=${valueQ1}]`).checked = true
    var valueQ2 = data.setup_stabilize_complete[0].q2
    document.querySelector(`input[name=ProcessTech_options2][value=${valueQ2}]`).checked = true
    var valueQ3 = data.setup_stabilize_complete[0].q3
    document.querySelector(`input[name=ProcessTech_options3][value=${valueQ3}]`).checked = true
    var valueQ4 = data.setup_stabilize_complete[0].q4
    document.querySelector(`input[name=ProcessTech_options4][value=${valueQ4}]`).checked = true
    var valueQ5 = data.setup_stabilize_complete[0].q5
    document.querySelector(`input[name=ProcessTech_options5][value=${valueQ5}]`).checked = true
    var valueQ6 = data.setup_stabilize_complete[0].q6
    document.querySelector(`input[name=ProcessTech_options6][value=${valueQ6}]`).checked = true

    //hot check

    document.getElementById('partNum').value = data.hotCheck[0].partNum
    document.getElementById('hotCheckInitials').value = data.hotCheck[0].initial
    var valueQ1 = data.hotCheck[0].q1
    document.querySelector(`input[name=hot_check_options1][value=${valueQ1}]`).checked = true
    document.getElementById('zone1').value = data.hotCheck[0].zone1
    document.getElementById('above').value = data.hotCheck[0].above
    document.getElementById('zone2').value = data.hotCheck[0].zone2
    document.getElementById('below').value = data.hotCheck[0].below

    //Complete initial 1st piece testing

    
    
}

function start() {
    console.log("in start" + localStorage.getItem("fileName"))

    const url = "http://localhost:3000/getData/";

    // let data = readJSON(fileName);
    // console.log("data recived: \n" + data)
    
    if(localStorage.getItem("fileName")){
        const fetchObject = {
            method: 'GET',
            headers: {
                'Content-Type' : 'text/html'
            }
        };
        
            fetch(url + localStorage.getItem("fileName"), fetchObject)
            .then(response => response.json())
            .then(jsonObject => {
                //findNextStage(JSON.stringify(jsonObject));
                fillFileds(jsonObject)
                //console.log(jsonObject);
            })
            
            //console.log(JSON.stringify(fileData))
           
        // let stage = fileData.length;
        // console.log(stage);
        
    } else {
        console.log("error file does not exist");
    }

}



window.onload = start;