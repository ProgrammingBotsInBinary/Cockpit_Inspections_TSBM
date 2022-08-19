function handleSubmitButtonWrite() {
    console.log("submit button clicked");
    
    const url = "http://localhost:3000/completeInitial1stPieceTesting"

    let initialsSelect = document.getElementById('initials')
    let initialValue = initialsSelect.options[initialsSelect.selectedIndex].text

    let partNumVal = document.getElementById('partNum').value

    let q1Val = document.querySelector('input[name=QualityTech_options1]:checked').value

    let q2Val = document.querySelector('input[name=QualityTech_options2]:checked').value

    let q3Val = document.querySelector('input[name=QualityTech_options3]:checked').value

    let q4Val = document.querySelector('input[name=QualityTech_options4]:checked').value

    let q5Val = document.querySelector('input[name=QualityTech_options5]:checked').value

    let FTankNum = document.getElementById('FTank').value

    let q6Val = document.querySelector('input[name=QualityTech_options6]:checked').value

    let GTankNum = document.getElementById('GTank').value

    let q7Val = document.querySelector('input[name=QualityTech_options7]:checked').value
    let q8Val = document.querySelector('input[name=QualityTech_options8]:check').value

    let qualSignature = document.getElementById('Qual_Tech_Signature').value

    const dataObject = {
        fileName: localStorage.getItem("fileName"),
        initial: initialValue,
        partNum: partNumVal,
        q1: q1Val,
        q2: q2Val,
        q3: q3Val,
        q4: q4Val,
        q5: q5Val,
        tank1: FTankNum,
        q6: q6Val,
        tank2: GTankNum,
        q7: q7Val,
        q8: q8Val,
        qualitySignature: qualSignature,
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
    const submitButton = document.querySelector('#submitBtn');

    submitButton.onclick = handleSubmitButtonWrite;
}



window.onload = start;