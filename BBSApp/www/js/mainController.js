//Globale variablen
var registered = false;
var PathURL = "file:///data/user/0/com.adobe.phonegap.app/files/phonegapdevapp/www/index.html";

//App wird initialisiert
function initJava()
{
    loadAppData();
}

window.onhashchange = function ()
{
    if (window.location.href == PathURL + "#finanzen")
    {
        loadFinances();
    }
}

//App Daten werden aus der MySQL Datenbank abgerufen
function loadAppData()
{
    //JSON Request
    var req = $.getJSON("https://filebase.strawberry-rp.de/app/get/authenticationController.php", function (result)
    {
        $.each(result, function (i, field)
        {
            if (field.model == device.model && field.uuid == device.uuid && field.serial == device.serial)
            {
                //Lokal wird dei Eindeutige ID aus der Datenbank gespeichert
                window.localStorage.setItem('id', field.id);
                registered = true;
                loadFinances();
            }
        });
    });

    //Wenn der Request fertig ist wird gefragt ob der User ín der Datenbank vorhanden ist
    //falls ja passiert nichts und falls nein kommt der Nutzer in das registrierungsformular
    req.success(function (response)
    {
        if (registered == false)
        {
            window.location.href = "#register";
        }
    });
}

//Hier wird ein HTTP Request zum Server gesendet welcher die nötigen Geräteinformationen etc. überträgt
function registerUser(email, username, password, password1)
{
    var str = "?model=" + device.model + "&serial=" + device.serial + "&uuid=" + device.uuid + "&email=" + email + "&username=" + username + "&password=" + password;
    var url = "https://filebase.strawberry-rp.de/app/send/authenticationController.php" + str;
    xmlReq = new XMLHttpRequest();
    xmlReq.open("POST", url, true);
    xmlReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlReq.setRequestHeader("Content-length", str.length);
    xmlReq.setRequestHeader("Connection", "close");
    xmlReq.send(str);

    registered = true;
    loadAppData();
    window.location.href = "#startseite";
}

(function ()
{
    "use strict";

    document.addEventListener('deviceready', onDeviceReady.bind(this), false);


    function onDeviceReady()
    {

        //Der Button für das Registrierungsformular
        $("#registerbutton").click(function ()
        {
            //Funktion wird gecallt
            registerUser(document.getElementById('email').value, document.getElementById('nickname').value, document.getElementById('password').value, document.getElementById('password1').value)
        });

    };
})();