function test()
{
    let plattform;
    let password;

    console.log('h');


    function setPlattform(plattform) {
        console.log(plattform.input1);
        plattform = plattform;

        if (plattform.input1 != null) {
            navigator.notification.prompt(
                plattform.input1,
                setPassword,
                'Passwort',
                ['Speichern', 'Abbrechen'],
                ''
            );
        }
    }    
    
    navigator.notification.prompt(
        'z.B: Facebook, Spotify',  
        setPlattform,
        'Plattform',            
        ['Weiter', 'Abbrechen'],
        ''
    );

    

    function setPassword(password) {
        console.log(password.input1);
        password = password;
    }
    
}
