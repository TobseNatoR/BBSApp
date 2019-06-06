//Globale Variablen
var financesFound = false;
var tableEinnahmenColor = false;
var tableAusgabenColor = false;
var alleEinnahmen = 0.0;
var alleAusgaben = 0.0;

function loadFinances()
{
    //Alles resetten
    console.log("DBG1");
    if (resetFinances() == true)
    {
        console.log("DBG2");
        var req = $.getJSON("https://filebase.strawberry-rp.de/app/get/financeController.php", function (result)
        {
            $.each(result, function (i, field)
            {
                if (field.uId == window.localStorage.getItem('id'))
                {
                    //Einnahmen
                    if (field.type == 1)
                    {
                        //Die Daten in unsere Tabelle schreiben
                        var tabelle, eintrag, zelle1, zelle2, inhalt1, inhalt2;
                        tabelle = document.getElementById('einnahmen').getElementsByTagName('tbody')[0];
                        eintrag = tabelle.insertRow(tabelle.rows.length);

                        zelle1 = eintrag.insertCell(0);
                        zelle2 = eintrag.insertCell(1);

                        //CSS formatting
                        if (tableEinnahmenColor == false)
                        {
                            zelle1.style.cssText = 'background-color: lightgreen;';
                            zelle2.style.cssText = 'background-color: lightgreen;';
                            tableEinnahmenColor = true;
                        }
                        else
                        {
                            zelle1.style.cssText = 'background-color: lightgrey;';
                            zelle2.style.cssText = 'background-color: lightgrey;';
                            tableEinnahmenColor = false;
                        }


                        inhalt1 = document.createElement('a');
                        inhalt1.setAttribute('href', 'javascript: einnahmen(' + field.Id + ')');
                        inhalt1.appendChild(document.createTextNode(field.description));
                        inhalt1.style.cssText = 'text-decoration:none; color: black;';

                        inhalt2 = document.createElement('a');
                        inhalt2.setAttribute('href', 'javascript: einnahmen(' + field.Id + ')');
                        inhalt2.appendChild(document.createTextNode(euro(field.value)));
                        inhalt2.style.cssText = 'text-decoration:none; color: black;';

                        zelle1.appendChild(inhalt1);
                        zelle2.appendChild(inhalt2);

                        alleEinnahmen = parseFloat(alleEinnahmen) + parseFloat(field.value);

                    }
                    //Ausgaben
                    else if (field.type == 2)
                    {
                        //Die Daten in unsere Tabelle schreiben
                        var tabelle, eintrag, zelle1, zelle2, inhalt1, inhalt2;
                        tabelle = document.getElementById('ausgaben').getElementsByTagName('tbody')[0];
                        eintrag = tabelle.insertRow(tabelle.rows.length);

                        zelle1 = eintrag.insertCell(0);
                        zelle2 = eintrag.insertCell(1);

                        //CSS formatting
                        if (tableAusgabenColor == false)
                        {
                            zelle1.style.cssText = 'background-color: lightcoral;';
                            zelle2.style.cssText = 'background-color: lightcoral;';
                            tableAusgabenColor = true;
                        }
                        else
                        {
                            zelle1.style.cssText = 'background-color: lightgrey;';
                            zelle2.style.cssText = 'background-color: lightgrey;';
                            tableAusgabenColor = false;
                        }


                        inhalt1 = document.createElement('a');
                        inhalt1.setAttribute('href', 'javascript: ausgaben(' + field.Id + ')');
                        inhalt1.appendChild(document.createTextNode(field.description));
                        inhalt1.style.cssText = 'text-decoration:none; color: black;';

                        inhalt2 = document.createElement('a');
                        inhalt2.setAttribute('href', 'javascript: ausgaben(' + field.Id + ')');
                        inhalt2.appendChild(document.createTextNode(euro(field.value)));
                        inhalt2.style.cssText = 'text-decoration:none; color: black;';

                        zelle1.appendChild(inhalt1);
                        zelle2.appendChild(inhalt2);

                        alleAusgaben = parseFloat(alleAusgaben) + parseFloat(field.value);
                    }
                }
            });
        });

        req.success(function (response)
        {
            //Wenn der JSON Request durch ist die Daten in das Formular schreiben
            if (alleEinnahmen != 0.0 && alleAusgaben != 0.0)
            {
                document.getElementById("einnahmen_insgesamt").innerHTML = "<div style='float: left; font-size:20px; color: lightgreen;'>" + euro(alleEinnahmen); + " </div><div style='clear: both;'></div>";
            }
            else
            {
                document.getElementById("einnahmen_insgesamt").innerHTML = "<div style='float: left; font-size:20px; color: red;'>0.00 €</div>";
            }

            if (alleAusgaben != 0.0 && alleEinnahmen != 0.0)
            {
                document.getElementById("ausgaben_insgesamt").innerHTML = "<div style='float: left; font-size:20px; color: lightcoral;'>" + euro(alleAusgaben); + " </div><div style='clear: both;'></div>";
            }
            else
            {
                document.getElementById("ausgaben_insgesamt").innerHTML = "<div style='float: left; font-size:20px; color: red;'>0.00 €</div>";
            }

            if (alleEinnahmen != 0.0 && alleAusgaben != 0.0)
            {
                document.getElementById("differenz").innerHTML = "<div style='float: left; font-size:20px; color: orange;'>" + euro(parseFloat(alleEinnahmen) - parseFloat(alleAusgaben)); + " </div><div style='clear: both;'></div>";
            }
            else
            {
                document.getElementById("differenz").innerHTML = "<div style='float: left; font-size:20px; color: red;'>0.00 €</div>";
            }
        });
    }
}

//Zurücksetz Funktion für die Tabellen und Counter
function resetFinances()
{
    var table = document.getElementById("einnahmen");
    var table1 = document.getElementById("ausgaben");
    while (table.rows.length > 0)
    {
        table.deleteRow(0);
    }
    while (table1.rows.length > 0)
    {
        table1.deleteRow(0);
    }

    alleEinnahmen = 0.0;
    alleAusgaben = 0.0;
    financesFound = false;
    tableEinnahmenColor = false;
    tableAusgabenColor = false;

    return true;
}

//Einnahmen hinzufügen Dialoge
function einnahmen_hinzufügen()
{
    var curr_beschreibung = null;
    var curr_geld = null;

    navigator.notification.prompt(
        'Beschreibung',  
        e_hinzufügen1,                  
        'Einnahme hinzufügen',            
        ['Weiter', 'Abbrechen'],             
        'Gehalt'                 
    );

    function e_hinzufügen1(results)
    {
        if (results.buttonIndex == 1)
        {
            curr_beschreibung = results.input1;

            navigator.notification.prompt(
                'Wie viele €?',
                e_hinzufügen2,
                'Einnahme hinzufügen',
                ['Weiter', 'Abbrechen'],
                '50.00'
            );
        }
    }

    function e_hinzufügen2(results)
    {
        if (results.buttonIndex == 1)
        {
            curr_geld = results.input1;

            var str = "?action=1&uid=" + window.localStorage.getItem('id') + "&type=1&description=" + curr_beschreibung + "&value=" + curr_geld;
            var url = "https://filebase.strawberry-rp.de/app/send/financeController.php" + str;
            console.log(url);
            xmlReq = new XMLHttpRequest();
            xmlReq.open("POST", url, true);
            xmlReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xmlReq.setRequestHeader("Content-length", str.length);
            xmlReq.setRequestHeader("Connection", "close");
            xmlReq.send(str);

            loadFinances();
        }
    }
}

//Ausgaben hinzufügen Dialoge
function ausgaben_hinzufügen()
{
    var curr_beschreibung = null;
    var curr_geld = null;

    navigator.notification.prompt(
        'Beschreibung',
        a_hinzufügen1,
        'Ausgabe hinzufügen',
        ['Weiter', 'Abbrechen'],
        'Handyvertrag'
    );

    function a_hinzufügen1(results)
    {
        if (results.buttonIndex == 1)
        {
            curr_beschreibung = results.input1;

            navigator.notification.prompt(
                'Wie viele €?',
                a_hinzufügen2,
                'Ausgabe hinzufügen',
                ['Weiter', 'Abbrechen'],
                '44.00'
            );
        }
    }

    function a_hinzufügen2(results)
    {
        if (results.buttonIndex == 1)
        {
            curr_geld = results.input1;

            var str = "?action=1&uid=" + window.localStorage.getItem('id') + "&type=2&description=" + curr_beschreibung + "&value=" + curr_geld;
            var url = "https://filebase.strawberry-rp.de/app/send/financeController.php" + str;
            console.log(url);
            xmlReq = new XMLHttpRequest();
            xmlReq.open("POST", url, true);
            xmlReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xmlReq.setRequestHeader("Content-length", str.length);
            xmlReq.setRequestHeader("Connection", "close");
            xmlReq.send(str);

            loadFinances();
        }
    }
}


function einnahmen(id)
{
    var curr_id = id;

    navigator.notification.confirm(
        'Einnahme wirklich löschen?',
        e_button,            
        'Löschen',           
        ['Ja', 'Nein']     
    );

    function e_button(buttonIndex)
    {
        if (buttonIndex == 1)
        {
            finazenloeschen(curr_id);
        }
    }
}

function ausgaben(id)
{
    var curr_id = id;

    navigator.notification.confirm(
        'Ausgabe wirklich löschen?',
        a_button,
        'Löschen',
        ['Ja', 'Nein']
    );

    function a_button(buttonIndex)
    {
        if (buttonIndex == 1)
        {
            finazenloeschen(curr_id);
        }
    }
}

function finazenloeschen(id)
{
    var str = "?action=2&uid=" + window.localStorage.getItem('id') + "&id=" + id;
    var url = "https://filebase.strawberry-rp.de/app/send/financeController.php" + str;
    console.log(url);
    xmlReq = new XMLHttpRequest();
    xmlReq.open("POST", url, true);
    xmlReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlReq.setRequestHeader("Content-length", str.length);
    xmlReq.setRequestHeader("Connection", "close");
    xmlReq.send(str);

    loadFinances();
}

function euro(value)
{
    var formattedString;

    value = parseFloat(value).toFixed(2);
    formattedString = value;
    formattedString = value.toString().replace(/\./g, ',');
    formattedString = formattedString + " €"
    return formattedString;
}
