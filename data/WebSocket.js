// page global
var connection = new WebSocket('ws://' + location.hostname + ':791/', ['arduino']);

// manage connection
connection.onopen = function () {
    console.log('WebSocket Connect ' + new Date());
};

connection.onerror = function (error) {
    console.log('WebSocket Error ', error);
};
connection.onmessage = function (e) {  
    //console.log('Message: ', e.data);
    onWebsocketMessage(e);
};

connection.onclose = function () {
    console.log('WebSocket connection closed');
};

/*
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        document.getElementById("stats").innerHTML = this.responseText;
    }
};
xhttp.open("GET", "/stats", true);
xhttp.send();
*/

// event handlers
function onWebsocketMessage(e) {
    //console.log("bReadyState is false")
    var myObj = JSON.parse(e.data);
    if (myObj.ID == 'MessageSelect') {
        document.getElementById("MessageSelect_View").innerHTML = myObj.Value;
        document.getElementById("MessageSelect").value = myObj.Value;
    }
    else if (myObj.ID == 'Brightness') {
        if (myObj.Value == 0) {
            document.getElementById("Brightness_View").innerHTML = "Off";
        }
        else if (myObj.Value == 10) {
            document.getElementById("Brightness_View").innerHTML = "Full";
        }
        else {
            document.getElementById("Brightness_View").innerHTML = myObj.Value;
        }
        document.getElementById("Brightness").value = myObj.Value;
    }
    else if (myObj.ID == 'Background') {
        if (myObj.Value == 0) {
            document.getElementById("Background_View").innerHTML = "Off";
        }
        else if (myObj.Value == 10) {
            document.getElementById("Background_View").innerHTML = "Full";
        }
        else {
            document.getElementById("Background_View").innerHTML = myObj.Value;
        }
        document.getElementById("Background").value = myObj.Value;
    }
    else if (myObj.ID == 'M_1') {
        document.getElementById("M_1").value = myObj.Value;
    }
    else if (myObj.ID == 'A_1') {
        document.getElementById("A_1").value = myObj.Value;
    }
    else {
        // set page element[ID] to Value
        document.getElementById(myObj.ID).innerHTML = myObj.Value;
    }
}

function sendMessage(message) {
    if (connection.readyState == 1) {
        //console.log(message);
        connection.send(message);
    }
    else if (connection.readyState == 3) {
        connection = new WebSocket('ws://' + location.hostname + ':781/', ['arduino']);
    }
}

function sendCommand(Command) {
    var valstr = '{"ID":"!Cmd","Value":"' + Command + '"}';
    sendMessage(valstr);
}

function sendBrightness() {
    document.getElementById('Set_Defaults').style.backgroundColor = '#00878F';
    var val = document.getElementById('Brightness').value;
    if (val == 0) {
        document.getElementById("Brightness_View").innerHTML = "Off";
    }
    else if (val == 10) {
        document.getElementById("Brightness_View").innerHTML = "Full";
    }
    else {
        document.getElementById("Brightness_View").innerHTML = val;
    }
    var valstr = '{"ID":"Brightness","Value":"' + val + '"}';
    sendMessage(valstr);
}

function sendBackground() {
    document.getElementById('Set_Defaults').style.backgroundColor = '#00878F';
    var val = document.getElementById('Background').value;
    if (val == 0) {
        document.getElementById("Background_View").innerHTML = "Off";
    }
    else if (val == 10) {
        document.getElementById("Background_View").innerHTML = "Full";
    }
    else {
        document.getElementById("Background_View").innerHTML = val;
    }
    var valstr = '{"ID":"Background","Value":"' + val + '"}';
    sendMessage(valstr);
}

function sendMessageEdit() {
    var val = document.getElementById('M_1').value;
    var valstr = '{"ID":"M_1","Value":"' + val + '"}';
    sendMessage(valstr);
}

function sendFormatEdit() {
    var val = document.getElementById('A_1').value;
    var valstr = '{"ID":"A_1","Value":"' + val + '"}';
    sendMessage(valstr);
}

function sendMessageSelect() {
    document.getElementById('Set_Defaults').style.backgroundColor = '#00878F';
    var val = document.getElementById('MessageSelect').value;
    document.getElementById('MessageSelect_View').innerHTML = val;
    var valstr = '{"ID":"MessageSelect","Value":"' + val + '"}';
    sendMessage(valstr);
}

function AlarmToggle() {
    bAlarmEnable = !bAlarmEnable;
    var valstr = '{"ID":"Alarm","Value":"' + bAlarmEnable + '"}';
    UpdateElements();
}

function UpdateElements() {
    //console.log('UpdateElements()');
    if (bAlarmEnable) {
        document.getElementById('Alarm_Active').style.backgroundColor = '#00878F';
        document.getElementById('MessageSelect').className = 'disabled';
        document.getElementById('MessageSelect').disabled = true;
        document.getElementById('Brightness').className = 'disabled';
        document.getElementById('Brightness').disabled = true;
        document.getElementById('Background').className = 'disabled';
        document.getElementById('Background').disabled = true;
    } else {
        document.getElementById('Alarm_Active').style.backgroundColor = '#999';
        document.getElementById('MessageSelect').className = 'enabled';
        document.getElementById('MessageSelect').disabled = false;
        document.getElementById('Brightness').className = 'enabled';
        document.getElementById('Brightness').disabled = false;
        document.getElementById('Background').className = 'enabled';
        document.getElementById('Background').disabled = false;
    }
}