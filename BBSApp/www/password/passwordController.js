var PASSWORD = PASSWORD || {};

PASSWORD.CreatePW = {

    CreatePasswortObj: function test() {
        let Plattform;
        let Password;
        let PwObject = [];
        console.log('h');

        navigator.notification.prompt(
            'z.B: Facebook, Spotify',
            setPlattform,
            'Plattform',
            ['Weiter', 'Abbrechen'],
            ''
        );

        function setPlattform(plattform) {
            console.log(plattform.input1);
            Plattform = plattform;

            if (plattform.input1 != null) {
                navigator.notification.prompt(
                    plattform.input1 + '-passwort eingeben !',
                    setPassword,
                    'Passwort',
                    ['Speichern', 'Abbrechen'],
                    ''
                );
            }
        }

        function setPassword(password) {
            console.log(password.input1);
            Password = password;
            
            var PwObject = new pwList(Password.input1, Plattform.input1);
            console.log(PwObject);
        }
        
    }
};

PASSWORD.PWList = {
    
    getlist() {
    }
};

function pwList(param1, param2) {
    var plattform = param1;
    var password = param2;
    var index = '0';

    console.log(plattform, password);
}