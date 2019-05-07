function initJava()
{
    //Erst alle App Daten laden lassen
}

function loadAppData()
{
    $.getJSON("https://filebase.strawberry-rp.de/app/authenticationController.php", function (result) {
        $.each(result, function (i, field) {
            if (field.Modell == device.model && field.UUID == device.uuid && field.Serial == device.serial)
            {
                
            }
        });
    });
}
