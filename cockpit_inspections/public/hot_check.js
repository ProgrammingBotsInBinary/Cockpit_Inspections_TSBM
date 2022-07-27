function handleSubmitButtonWrite() {
    console.log("submit button clicked");
    
    const url = "http://localhost:3000/hotCheck/"

    let partNumVal = document.querySelector('#partNum').value

    let initialsSelect = document.getElementById('initials')
    let initialValue = initialsSelect.options[initialsSelect.selectedIndex].text

    let q1Val = document.querySelector('input[name=hot_check_options1]:checked').value
    let zone1Val = document.querySelector('#zone1').value
    let aboveVal = document.querySelector('#above').value

    let zone2Val = document.querySelector('#zone2').value
    let belowVal = document.querySelector('#below').value
    

    const dataObject = {
        fileName: localStorage.getItem("fileName"),
        partNum: partNumVal,
        initial: initialValue,
        q1: q1Val,
        zone1: zone1Val,
        above: aboveVal,
        zone2: zone2Val,
        below: belowVal,
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