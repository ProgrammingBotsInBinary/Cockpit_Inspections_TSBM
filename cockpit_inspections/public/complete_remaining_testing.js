function handleSubmitButtonWrite() {
    console.log("submit button clicked");
    
    const url = "http://localhost:3000/completeRemainingTesting"

    let q1Val = document.querySelector('input[name=QualityTech_options1]:checked').value

    let q2Val = document.querySelector('input[name=QualityTech_options2]:checked').value

    let q3Val = document.querySelector('input[name=QualityTech_options3]:checked').value

    //let q4Val = document.querySelector('input[name=QualityTech_options4]:checked').value



    const dataObject = {
        fileName: localStorage.getItem("fileName"),
        q1: q1Val,
        q2: q2Val,
        q3: q3Val,
        q4: q4Val,
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