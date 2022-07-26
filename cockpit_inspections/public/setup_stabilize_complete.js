function handleSubmitButtonWrite() {
    console.log("submit button clicked");
    
    const url = "http://localhost:3000/setupStabilizeComplete"

    let initialsSelect = document.getElementById('initials')
    let initialValue = initialsSelect.options[initialsSelect.selectedIndex].text

    let q1Val = document.querySelector('input[name=ProcessTech_options1]:checked').value

    let q2Val = document.querySelector('input[name=ProcessTech_options2]:checked').value

    let q3Val = document.querySelector('input[name=ProcessTech_options3]:checked').value

    let q4Val = document.querySelector('input[name=ProcessTech_options4]:checked').value

    let q5Val = document.querySelector('input[name=ProcessTech_options5]:checked').value

    let q6Val = document.querySelector('input[name=ProcessTech_options6]:checked').value

    const dataObject = {
        fileName: localStorage.getItem("fileName"),
        initial: initialValue,
        q1: q1Val,
        q2: q2Val,
        q3: q3Val,
        q4: q4Val,
        q5: q5Val,
        q6: q6Val,
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