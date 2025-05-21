// die Funktion checkNumber überprüft, ob die eingegebene Zahl (nummer) gleich der zufällig generierten Zahl (randomNum) ist.
// Wenn die Zahl richtig ist, wird die Nachricht "Richtig!" zurückgegeben.
// Wenn die Zahl zu niedrig oder zu hoch ist, wird die Versuchsanzahl um 1 erhöht und die entsprechende Nachricht zurückgegeben.

function checkNumber(nummer, randomNum, setNachricht, setVersuche, setZahlenVerlauf) {
    if (nummer == '' || nummer == null || nummer == undefined) {
        setNachricht("Bitte eine Zahl eingeben!");
        return
    }

    // Versuch hochzählen
    setVersuche(prev => prev + 1);
    // Nachricht direkt berechnen, statt auf setNachricht zu warten
    const neueNachricht = generiereText(nummer, randomNum);
    setNachricht(neueNachricht);

    setZahlenVerlauf(prev => [...prev, { nummer: nummer, nachricht: neueNachricht, versuche: prev.length +1 }]);
}

function generiereText(nummer, randomNum) {
    if (nummer == randomNum) {
        return "Richtig!"

    } else if (nummer < randomNum) {
        if (randomNum - nummer <= 3) {
            return "Bisschen zu NIEDRIG aber du hast die Zahl fast erraten!";
        }
        if (randomNum - nummer <= 10) {
            return "Zu NIEDRIG, aber SEHR nah dran!";
        }
        if (randomNum - nummer <= 50) {
            return "Zu NIEDRIG, aber nah dran!";
        }
    return "Zu NIEDRIG!";
    } else {
        if (nummer - randomNum <= 3) {
            return "Bisschen zu HOCH aber du hast die Zahl fast erraten!";
        }        
        if (nummer - randomNum <= 10) {
            return "Zu HOCH, aber SEHR nah dran!";
        }
        if (nummer - randomNum <= 50) {
            return "Zu HOCH, aber nah dran!";
        }
    return "Zu HOCH!";
    }
}

export { checkNumber }