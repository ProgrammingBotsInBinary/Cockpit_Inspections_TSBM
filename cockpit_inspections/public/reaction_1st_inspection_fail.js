function handleSubmitButtonWrite() {
    console.log("submit button clicked");
    
    const url = "http://localhost:3000/reaction1stInspectionFail"

    let initialsSelect = document.getElementById('initials')
    let initialValue = initialsSelect.options[initialsSelect.selectedIndex].text

    let q1Val = document.querySelector('input[name=Supervisor_options1]:checked').value


    const dataObject = {
        fileName: localStorage.getItem("fileName"),
        initial: initialValue,
        q1: q1Val,
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