//User Variablen
var authorizedUser = false;

//Lokale App Variablen
var Version = "004";

//Datenbank App Variablen
var db_App_Version = null;
var db_Download_Link = null;
var db_App_Passwort = null;

function initJava()
{
    //Erst alle App Daten laden lassen
    loadAppData();

    setTimeout(function () {
        deviceInfo();
        versionCheck();
        createText();
        jsonGetData();
        checkConnection();
    }, 2000);
}


function loadAppData()
{
$.getJSON("https://www.gfi-ernst.com/GFIintern/gfi.php?Id=gfiadressbuchapp2019&db=3", function (result) {
    $.each(result, function (i, field) {
        db_App_Version = field.Version;
        db_Download_Link = field.Download_Link;
        db_App_Passwort = field.Passwort;
    });
    });

$.getJSON("https://www.gfi-ernst.com/GFIintern/gfi.php?Id=gfiadressbuchapp2019&db=1000", function (result) {
    $.each(result, function (i, field) {
        if (field.Modell == device.model && field.UUID == device.uuid && field.Serial == device.serial)
        {
            authorizedUser = true;
        }
    });
});
}

function nameNumberSearch(Name)
{
    //Formular zurücksetzen
    document.getElementById('searchResults').innerHTML = "";

    $.getJSON("https://www.gfi-ernst.com/GFIintern/gfi.php?Id=gfiadressbuchapp2019&db=2", function (result)
    {
        $.each(result, function (i, field)
        {
            //Variablen zuweisen
            var Asp_Name = field.Asp_Name;
            var Asp_Vorname = field.Asp_Vorname;
            var Asp_Tel = formatNumber(field.Asp_Tel);

            if (Asp_Name.indexOf(Name) > -1 || Asp_Vorname.indexOf(Name) > -1 || Asp_Tel.indexOf(Name) > -1)
            {
                document.getElementById('searchResults').innerHTML += "<a style='text-decoration:none; color: black; font-weight: bold;' href='tel:" + formatNumber(field.Asp_Tel) + "';>" + field.Asp_Anrede + " " + field.Asp_Vorname + " " + field.Asp_Name + "</a><br>";
            }
        });
    });

    $.mobile.changePage('#suche-dialog', { transition: 'pop', role: 'dialog' });
}

function getFirma(Id)
{

}

function deviceInfo()
{
    if (authorizedUser == false)
    {
        //Für test am PC muss die Zeile unter dieser ausgeklammert werden
        registerUser();
    }
    else
    {
        //Hier passiert dann nichts da er normale Rechte hat
    }
}

function formatNumber(Number)
{
    var newNumber = null;

    //Erstmal die 0 ersetzen falls am Anfang eine steht
    if (Number.charAt(0) == "0")
    {
        newNumber = Number.replace('0', '+49');
    }
    else
    {
        newNumber = "+49441" + Number;
    }

    if (newNumber == "+49441")
    {
        newNumber = "0";
    }

    //Sonderzeichen entfernen
    newNumber = newNumber.replace(/-/g, '');
    newNumber = newNumber.replace('/', '');
    newNumber = newNumber.replace(/ /g, '');

    console.log(newNumber);

    return newNumber;
}

function registerUser()
{
    window.location.href = "#login";
}

function loginCheck(Passwort)
{
    if (Passwort != db_App_Passwort)
    {
        document.getElementById('errorInfos').innerHTML = "Dieses Passwort scheint nicht zu stimmen.";
        $.mobile.changePage('#error-dialog', { transition: 'pop', role: 'dialog' });
    }
    else
    {
        authorizeDevice();
    }

}

function authorizeDevice()
{
    var str = "?Id=gfiadressbuchapp2019&Modell=" + device.model + "&UUID=" + device.uuid + "&Serial=" + device.serial;
    var url = "https://www.gfi-ernst.com/GFIintern/getData.php" + str;
    xmlReq = new XMLHttpRequest();
    xmlReq.open("POST", url, true);
    xmlReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlReq.setRequestHeader("Content-length", str.length);
    xmlReq.setRequestHeader("Connection", "close");
    xmlReq.send(str);

    authorizedUser = true;
    createText();
    window.location.href = "#startseite";
}

//Generelle Texte die in die App geschrieben werden
function createText()
{
    document.getElementById('timerInfo').innerHTML = "Die Arbeitszeit Zählung wurde gestoppt.";
    document.getElementById('welcomeText').innerHTML = "<i>Ihre App Version: " + Version + "</i><br><br>";

    if (authorizedUser == true) {
        document.getElementById('welcomeText').innerHTML += "Ihr Gerät ist uns bekannt.<br>Sie können die App im vollen Umfang nutzen.";
    }
    else
    {
        document.getElementById('welcomeText').innerHTML += "Ihr Gerät ist uns nicht bekannt.<br>Sie haben so keinen Zugriff.";
    }
}

function jsonGetData()
{
    $.getJSON("https://www.gfi-ernst.com/GFIintern/gfi.php?Id=gfiadressbuchapp2019&db=1", function (result)
    {
        $.each(result, function (i, field)
        {
            //Die Daten in unsere Tabelle schreiben
            var tabelle, eintrag, zelle1, zelle2, zelle3, zelle4, zelle5, inhalt1, inhalt2, inhalt3, inhalt4, inhalt5, link;
            tabelle = document.getElementById('telefonbuch').getElementsByTagName('tbody')[0];
            eintrag = tabelle.insertRow(tabelle.rows.length);

            zelle1 = eintrag.insertCell(0);
            zelle3 = eintrag.insertCell(1);

            inhalt1 = document.createElement('a');
            inhalt1.setAttribute('href', 'javascript: nameInfo(' + field.Adr_ID + ')');
            inhalt1.appendChild(document.createTextNode(field.Adr_Firma));
            inhalt1.style.cssText = 'text-decoration:none; color: black;';


            inhalt3 = document.createTextNode(field.Adr_Ort);
            

            zelle1.appendChild(inhalt1);
            zelle3.appendChild(inhalt3);
        });
    });
}

function checkConnection()
{
    var networkState = navigator.connection.type;

    if (networkState == Connection.NONE) {
        document.getElementById('errorInfos').innerHTML = "Sie haben derzeit keine Verbindung.<br>Das Adressbuch konnte nicht geladen werden.";
        $.mobile.changePage('#error-dialog', { transition: 'pop', role: 'dialog' });
    }
}

function versionCheck()
{
    if (Version != db_App_Version)
    {
        document.getElementById('errorInfos').innerHTML = "Ihre Version ist nicht mehr aktuell.<br>Versionsnummer: " + Version + "<br>Aktuellste Version: " + db_App_Version + "<br><br>";
        document.getElementById('errorInfos').innerHTML += "<b>1:</b> Bitte downloaden Sie die neuste Version.<br>";
        document.getElementById('errorInfos').innerHTML += "<b>2:</b> Deinstallieren Sie dann diese Version.<br>";
        document.getElementById('errorInfos').innerHTML += "<b>3:</b> Installieren Sie die neuste Version.<br><br>";
        document.getElementById('errorInfos').innerHTML += "Link: <a style='text-decoration:none; color: black; font-weight: bold;' href='" + db_Download_Link + "';> " + db_Download_Link + "</a>";

        $.mobile.changePage('#error-dialog', { transition: 'pop', role: 'dialog' });
    }
}

function nameInfo(Id)
{

    $.getJSON("https://www.gfi-ernst.com/GFIintern/gfi.php?Id=gfiadressbuchapp2019&db=1", function (result) {
        $.each(result, function (i, field) {
            if (field.Adr_ID == Id) {
                document.getElementById('selectInfos').innerHTML = "<b>Adresse:</b><br>" + field.Adr_Str + "<br>" + field.Adr_Plz + " " + field.Adr_Ort + "<br>Tel: <a style='text-decoration:none; color: black; font-weight: bold;' href='tel:" + formatNumber(field.Adr_Tel) + "';> " + formatNumber(field.Adr_Tel) + "</a><br><br><b>Ansprechpartner:</b><br>";
                
            }
        });
    });


    $.getJSON("https://www.gfi-ernst.com/GFIintern/gfi.php?Id=gfiadressbuchapp2019&db=2", function (result) {
        $.each(result, function (i, field)
        {
            if (field.Asp_AdrID == Id)
            {
                document.getElementById('selectInfos').innerHTML += "<a style='text-decoration:none; color: black; font-weight: bold;' href='tel:" + formatNumber(field.Asp_Tel) + "';>" + field.Asp_Anrede + " " + field.Asp_Vorname + " " + field.Asp_Name + "</a><br>";
            }
        });
    });

    $.mobile.changePage('#info-dialog', { transition: 'pop', role: 'dialog' });
}

function tableSearch()
{    
    var input, filter, table, tr, td, i;
    input = document.getElementById("searchInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("telefonbuch");
    tr = table.getElementsByTagName("tr");

    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td");
        for (j = 0; j < td.length; j++) {
            let tdata = td[j];
            if (tdata) {
                if (tdata.innerHTML.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = "";
                    break;
                } else {
                    tr[i].style.display = "none";
                }
            }
        }
    }
}

//Alles hier rein!!!
(function () {
    "use strict";

    document.addEventListener('deviceready', onDeviceReady.bind(this), false);

    var time = 0; //time
    var lap = 1; //current lap
    var isRunning = false; //is the timer running
    var isPaused = false; //is the app paused
    var currentUpdateId; //current interval id

    function onDeviceReady() {

        // Handle the Cordova pause and resume events
        document.addEventListener('pause', onPause.bind(this), false);
        document.addEventListener('resume', onResume.bind(this), false);

        // TODO: Cordova has been loaded. Perform any initialization that requires Cordova here.

        //Login
        $("#loginButton").click(function () {
            var Passwort = document.getElementById('loginPasswort').value;
            loginCheck(Passwort);
        });

        $("#sucheButton").click(function () {
            var Name = document.getElementById('namennummersearchInput').value;
            nameNumberSearch(Name);
        });

        $("#stopstart").click(function () {

            if (isRunning) {
                //pause timer
                isPaused = true;
                isRunning = false;

                //set button text
                $(this).text("Start");
                $("#lapreset").text("Reset");
                document.getElementById('timerInfo').innerHTML = "Die Arbeitszeit Zählung wurde pausiert.";
            }
            else
            {
                //start stopwatch - if pause continue else new timer
                if (isPaused)
                {
                    isPaused = false;
                    document.getElementById('timerInfo').innerHTML = "Die Arbeitszeit wird nun gezählt.";
                }
                else
                {
                    document.getElementById('timerInfo').innerHTML = "Die Arbeitszeit wird nun gezählt.";
                    currentUpdateId = setInterval(updateTimer, 1000);
                }

                isRunning = true;

                //update button text
                $(this).text("Stop");
                $("#lapreset").text("Lap");
            }
        });

        $("#lapreset").click(function () {

            //if paused reset else take lap
            
            //stop stopwatch
            clearInterval(currentUpdateId);
            isRunning = false;
            isPaused = false;

            //update button text
            $(this).text("Lap");
            $("#stopstart").text("Start");

            //reset time
            time = 0;
            $("#timer").text("0.00");

            //reset lap
            lap = 1;
            $("#list-times").html("");

            document.getElementById('timerInfo').innerHTML = "Die Arbeitszeit Zählung wurde gestoppt.";
        });

    };

    function updateTimer() {

        //if the app is not paused increase the timer
        if (!isPaused) {
            time++;
            var fixxedTime = time / 3600;
            fixxedTime = fixxedTime.toFixed(2);

            $("#timer").text(fixxedTime);
        }

    };

    function onPause() {
        
    };

    function onResume() {
        
    };
})();