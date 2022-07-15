

function handleSubmitButton() {
    console.log("submit button clicked");

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

    console.log("date = " + currDate);
    //console.log("Add " + lineValue + " " + stationValue + " " + partName + " " + description)

    const url = "http://localhost:3000/add1stPieceApprovalProcess"

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

    
   
}

function handleSubmitButtonWrite() {
    console.log("submit button clicked");
    

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

    const test = "butt nugget"

    fs.writeFile('/data/' + shiftValue + '/' + currDate, test, err => {
        if(err) {
            console.log("nope")
            console.log(err);
        }
    })



}

function start() {
    // const submitButton = document.querySelector('#submitBtn');

    // submitButton.onclick = handleSubmitButtonWrite;
}

window.onload = start;