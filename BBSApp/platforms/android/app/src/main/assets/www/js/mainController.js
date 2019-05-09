var registered = false;


function initJava()
{
    loadAppData();
}

function loadAppData()
{
    var req = $.getJSON("https://filebase.strawberry-rp.de/app/authenticationController.php", function (result)
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

function registerUser()
{

}

(function ()
{
    "use strict";

    document.addEventListener('deviceready', onDeviceReady.bind(this), false);


    function onDeviceReady()
    {

        $("#register").click(function ()
        {
            alert("geht");
        });

    };
})();