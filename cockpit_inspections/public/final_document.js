function fillFields(data){
    console.log(data)
    
    //first piece inspection

    console.log(data[0])

    document.getElementById('Supervisor_Initials1').value = data.first_piece_approval[0].initial

    document.getElementById('1_Shift').value = data.first_piece_approval[0].shift
   
    document.getElementById('Press').value = data.first_piece_approval[0].pressNum

    document.getElementById('Cavity').value = data.first_piece_approval[0].cavityNum

    document.getElementById('1_PartName').value = data.first_piece_approval[0].part
    
    
    

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
    document.getElementById('QT_Initials1').value = data.hotCheck[0].initial
    var valueQ1 = data.hotCheck[0].q1
    document.querySelector(`input[name=hot_check_options1][value=${valueQ1}]`).checked = true
    document.getElementById('zone1').value = data.hotCheck[0].zone1
    document.getElementById('above').value = data.hotCheck[0].above
    document.getElementById('zone2').value = data.hotCheck[0].zone2
    document.getElementById('below').value = data.hotCheck[0].below

    //Complete initial 1st piece testing
    document.getElementById('QT_Initials2').value = data.completeInitial1stPieceTesting[0].initial
    document.getElementById('TLabel').value = data.completeInitial1stPieceTesting[0].partNum
    var valueQ = data.completeInitial1stPieceTesting[0].q1
    document.querySelector(`input[name=QualityTech_options1][value=${valueQ}]`).checked = true
    var valueQ = data.completeInitial1stPieceTesting[0].q2
    document.querySelector(`input[name=QualityTech_options2][value=${valueQ}]`).checked = true
    var valueQ = data.completeInitial1stPieceTesting[0].q3
    document.querySelector(`input[name=QualityTech_options3][value=${valueQ}]`).checked = true
    var valueQ = data.completeInitial1stPieceTesting[0].q4
    document.querySelector(`input[name=QualityTech_options4][value=${valueQ}]`).checked = true
    var valueQ = data.completeInitial1stPieceTesting[0].q5
    document.querySelector(`input[name=QualityTech_options5][value=${valueQ}]`).checked = true
    document.getElementById('FTank').value = data.completeInitial1stPieceTesting[0].tank1
    var valueQ = data.completeInitial1stPieceTesting[0].q6
    document.querySelector(`input[name=QualityTech_options6][value=${valueQ}]`).checked = true
    document.getElementById('GTank').value = data.completeInitial1stPieceTesting[0].tank2
    var valueQ = data.completeInitial1stPieceTesting[0].q7
    document.querySelector(`input[name=QualityTech_options7][value=${valueQ}]`).checked = true

    //Review and Sign Off
    var valueQ = data.reviewAndSignOff[0].q1
    document.querySelector(`input[name=ProcessTech_options7][value=${valueQ}]`).checked = true
    document.getElementById('qualityTechSignature').value = data.reviewAndSignOff[0].qualTechSignature

    //Complete Remaining Testing
    var valueQ = data.completeRemainingTesting[0].q1
    document.querySelector(`input[name=QualityTech_options8][value=${valueQ}]`).checked = true
    var valueQ = data.completeRemainingTesting[0].q2
    document.querySelector(`input[name=QualityTech_options9][value=${valueQ}]`).checked = true
    var valueQ = data.completeRemainingTesting[0].q3
    document.querySelector(`input[name=QualityTech_options10][value=${valueQ}]`).checked = true
    var valueQ = data.completeRemainingTesting[0].q4
    document.querySelector(`input[name=QualityTech_options11][value=${valueQ}]`).checked = true

    //Reaction If 1st Piece Inspection Fails
    document.getElementById('Supervisor_Initials2').value = data.reaction1stInspectionFail[0].initial
    var valueQ = data.reaction1stInspectionFail[0].q1
    document.querySelector(`input[name=Supervisor_options1][value=${valueQ}]`).checked = true




}   

function pdf(){
    var element = document.body;
    var options = {
        margin:       0,
        filename:     'myfile.pdf',
        image:        { type: 'jpeg', quality: 1 },
        html2canvas:  { scale: 1.5 },
        jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait',precision: '12' }
    };
    html2pdf().set(options).from(element).save();
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
                fillFields(jsonObject)
                console.log(jsonObject)

                //uncomment pdf() to auto download pdf of site
                //pdf();
            })
            
            //console.log(JSON.stringify(fileData))
           
        // let stage = fileData.length;
        // console.log(stage);
        
    } else {
        console.log("error file does not exist");
    }

}



window.onload = start;