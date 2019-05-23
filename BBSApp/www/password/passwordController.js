var PASSWORD = PASSWORD || {};
var PwObject = new pwList || {};
var PwList = Array() || {};

PASSWORD = {

    CreatePasswortObj: function test() {
        let Plattform;
        let Password;

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
            Password = password;

            PwObject = { password: Password.input1, plattform: Plattform.input1, index: PwList.length };
            PwList.push(PwObject);
        }
        
    },
    GetPasswortList: function showPwList() {

        var PwFormatted = '';

        for (var i = 0; i < PwList.length; i++) {

            PwFormatted += "Plattform: " + PwList[i].plattform + "\nPasswort: " + PwList[i].password + "\n\n";
        }
       
        navigator.notification.alert(
            PwFormatted,  // message
            alertDismissed,         // callback
            'Game Over',            // title
            'Done'                  // buttonName
        );

        function alertDismissed() {
            // do something
        }

        console.log('ende');
    },
    CreateRandomPw: function create() {




        console.log('randompasswort')
    },
    TestPasswort: function test() {

        console.log('test');
    }
};


function pwList() {
    var plattform;
    var password;
    var index;
}