// Global Variablen erstellen
var PASSWORD = PASSWORD || {};
var PwObject = new pwList || {};
var PwList = Array() || {};

//Namespace
PASSWORD = {
    //Klasse
    CreatePasswortObj: function test() {
        let Plattform;
        let Password;


        //wird automatisch aufgerufen eine art methode
        navigator.notification.prompt(
            'z.B: Facebook, Spotify',
            setPlattform,
            'Plattform',
            ['Weiter', 'Abbrechen'],
            ''
        );
        //Methode 
        function setPlattform(plattform) {
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
        //Methode
        function setPassword(password) {
            Password = password;

            PwObject = { password: Password.input1, plattform: Plattform.input1, index: PwList.length };
            PwList.push(PwObject);
        }
        
    },
    //Klasse
    GetPasswortList: function showPwList() {

        var PwFormatted = '';

        for (var i = 0; i < PwList.length; i++) {

            PwFormatted += "Plattform: " + PwList[i].plattform + "\nPasswort: " + PwList[i].password + "\n\n";
        }
       
        navigator.notification.alert(
            PwFormatted,
            alertDismissed,         
            'Ein Fehler',            
            'Ok'                  
        );

        function alertDismissed() {
            // do something
        }
    },   
    //Klasse unvollständig
    TestPasswort: function test() {

        console.log('test');
    }
};


function pwList() {
    var plattform;
    var password;
    var index;
}