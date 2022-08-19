
function fillFields(data){

    document.getElementById('partNum').value = data.hotCheck[0].partNum
    document.getElementById('QT_Initials1').value = data.hotCheck[0].initial
    var valueQ1 = data.hotCheck[0].q1
    document.querySelector(`input[name=hot_check_options1][value=${valueQ1}]`).checked = true
    document.getElementById('zone1').value = data.hotCheck[0].zone1
    document.getElementById('above').value = data.hotCheck[0].above
    document.getElementById('zone2').value = data.hotCheck[0].zone2
    document.getElementById('below').value = data.hotCheck[0].below

}


function handleSubmitButtonWrite() {
    console.log("submit button clicked");
    
    const url = "http://localhost:3000/productionSupervisorSignature"

    let ProductionSignatureVal = document.getElementById('ProductionSignature').value

    const dataObject = {
        fileName: localStorage.getItem("fileName"),
        ProductionSignature: ProductionSignatureVal,
    }


    console.log(JSON.stringify(dataObject))

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

        window.location.href = "index.html"
}


function start() {

    console.log("I honestly dont think it is making it here")
    //Used to get data values from JSON file
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

                console.log(localStorage.getItem("fileName"))
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

    //Needed for setting data values
    const submitButton = document.querySelector('#submitBtn');

    submitButton.onclick = handleSubmitButtonWrite;
}



window.onload = start;