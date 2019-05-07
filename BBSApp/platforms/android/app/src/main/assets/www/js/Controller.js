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

        console.log(device.serial);
        console.log(device.uuid);
        console.log(device.model);

        console.log("fertig");
    });
}

function registerUser()
{

}
