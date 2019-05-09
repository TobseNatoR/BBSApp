var registered = false;


function initJava()
{
    loadAppData();
}

function loadAppData()
{
    var req = $.getJSON("https://filebase.strawberry-rp.de/app/get/authenticationController.php", function (result)
    {
        $.each(result, function (i, field)
        {
            if (field.model == device.model && field.uuid == device.uuid && field.serial == device.serial)
            {         
                registered = true;
            }
        });
    });

    req.success(function (response)
    {
        if (registered == false)
        {
            window.location.href = "#register";
        }

        
    });
}

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
    window.location.href = "#startseite";
}

(function ()
{
    "use strict";

    document.addEventListener('deviceready', onDeviceReady.bind(this), false);


    function onDeviceReady()
    {

        $("#registerbutton").click(function ()
        {
            registerUser(document.getElementById('email').value, document.getElementById('nickname').value, document.getElementById('password').value, document.getElementById('password1').value)
        });

    };
})();