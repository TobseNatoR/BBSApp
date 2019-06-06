## Finanz Expert

# Datenbank

> Link zu phpmyadmin https://strawberry-rp.de/phpmyadmin

**Nutzername:Passwort:** SchulApp:2qZlHxDGqOIZ6tnq



**02.05.2019** 
- [x] Start (Überlegung was wir machen wollen)

**bis 07.05.2019** 
- [x] Workspace einrichten

**bis 09.05.2019**
- [x] Register Formular fertigstellen

**bis 23.05.2019**
- [x] Passwortsafe fertigstellen
- [x] Finanzverwaltung fertigstellen

**bis 01.06.2019**
- [ ] Sicherheitsrelevante überarbeitungen
- [x] Ende



# PHP Controller

**Senden INSERT** Passwort Daten https://filebase.strawberry-rp.de/app/send/passwordController.php?uid=&description=&password=


**Senden INSERT** Device Daten https://filebase.strawberry-rp.de/app/send/authenticationController.php?model=&serial=&uuid=&email=&username=&password=


> Action=1 ist INSERT, Action=2 ist DELETE


**Senden INSERT** Finanz Daten https://filebase.strawberry-rp.de/app/send/financeController.php?action=&uid=&type=&description=&value=

**Senden DELETE** Finanz Daten https://filebase.strawberry-rp.de/app/send/financeController.php?action=&id=&uid=


**Empfangen** App User https://filebase.strawberry-rp.de/app/get/authenticationController.php


**Empfangen** Passwort Daten https://filebase.strawberry-rp.de/app/get/passwordController.php


**Empfangen** Finanz Daten https://filebase.strawberry-rp.de/app/get/financeController.php
