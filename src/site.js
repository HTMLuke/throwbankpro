const path = require('node:path');
const fs = require('fs');
function gohome(){
    window.location.href = "../src/index.html";
    localStorage.setItem('selectedTeam', "");

}
function closewin(){
    window.close();
}
function gonewthrow(){
    window.location.href = "../src/newthrow.html";

}
function getPlayers(){

     const selectedTeam = localStorage.getItem('selectedTeam');
    // const selectedTeam = teamselect;
    console.log(selectedTeam);
    document.getElementById('head1team').textContent = selectedTeam;
    const filePath = '../databank.json';
  
  // Lese die JSON-Datei
  fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
          console.error('Fehler beim Lesen der Datei:', err);
          return;
      }
  
      try {
          // Parse das JSON
          const jsonData = JSON.parse(data);
          const chosenteam = jsonData.teams.find(team => team.teamname === selectedTeam);
          if (!chosenteam) {
              console.error('Team "THW Kiel" nicht gefunden');
              return;
          }
          // Extrahiere die Teamnamen
          
        // Initialisiere die Variable für die Teamnamen
        const playersinteam = chosenteam.players;

        // Iteriere durch die Teams und füge die Namen zur Variable hinzu
        playersinteam.forEach(player => {
	var buttonEl = document.createElement("a");
  const newButton = document.createElement('button');
  newButton.textContent = player.playernumber + " " + player.position;
  newButton.setAttribute('onclick', 'playerselected(this)');
  newButton.setAttribute('id', player.playernumber);
  newButton.className = "d-grid gap-2 col-6 mx-auto btn btn-primary tnteams"
  buttonEl.appendChild(newButton);
  document.getElementById('playerbtns').appendChild(buttonEl);
            
        });
  
      } catch (error) {
          console.error('Fehler beim Parsen des JSON:', error);
      }
  });
}

function loadpalyermenu(){
    let playernum = localStorage.getItem('playernumber');
    let playerposit = localStorage.getItem('playerpos');
    playerposit.trim();
    console.log(playernum);
    console.log(playerposit);
    document.getElementById('heading1').textContent = "Nummer: " + playernum;
    document.getElementById('heading2').textContent = playerposit;

}
function teamselected(button){
    localStorage.setItem('selectedTeam', button.innerText);

 window.location.href = "../src/team.html";

}
function playerselected(button){
localStorage.setItem('playernumber', button.id);
rawpos = button.textContent;
let resultpos = rawpos.replace(/[0-9]/g, '');
localStorage.setItem('playerpos', resultpos);
console.log(resultpos);
console.log(button.id);
window.location.href = "../src/playermenu.html";

}

function getItems() {
    

  
  // Pfad zur JSON-Datei
  const filePath = '../databank.json';
  
  // Lese die JSON-Datei
  fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
          console.error('Fehler beim Lesen der Datei:', err);
          return;
      }
  
      try {
          // Parse das JSON
          const jsonData = JSON.parse(data);
  
          // Extrahiere die Teamnamen
          
        // Initialisiere die Variable für die Teamnamen
        let allTeamNames = '';

        // Iteriere durch die Teams und füge die Namen zur Variable hinzu
        jsonData.teams.forEach(team => {
          allTeamNames = team.teamname 
          const div = document.getElementById('teambtns');
	var buttonEl = document.createElement("a");
  const newButton = document.createElement('button');
  newButton.textContent = team.teamname;
  newButton.setAttribute('onclick', 'teamselected(this)');
  newButton.className = "d-grid gap-2 col-6 mx-auto btn btn-primary tnteams"
  buttonEl.appendChild(newButton);
  document.getElementById('teambtns').appendChild(buttonEl);
  allTeamNames = '';
            
        });
  

      } catch (error) {
          console.error('Fehler beim Parsen des JSON:', error);
      }
  });
 
  }
function openaddwindow(){
    addform = document.getElementById("addteam");
  addform.style.display = "block";      //display modal dialog form
}

function openaddplayer(){
    addform = document.getElementById("addplayer");
    addform.style.display = "block"; 
}

function closeplayerdwindow(){
    addbox = document.getElementById("addplayer");   //get html add modal dialog
    addbox.style.display = "none";    
    textboxaddnum = document.getElementById('addnumberbox');
    textboxaddnum.value = ""; 
    textboxaddpos = document.getElementById('addpositionbox');
    textboxaddpos.value = ""; 
  //hide modal dialog form      //clear error text 
    error = document.getElementById('eingabefehler');     //error text input box
    error.value = "";
}

function closeaddwindow(){
    addbox = document.getElementById("addteam");   //get html add modal dialog
    addbox.style.display = "none";    
    textboxadd = document.getElementById('addteambox');
    textboxadd.value = ""; 
  //hide modal dialog form      //clear error text 
    error = document.getElementById('eingabefehler');     //error text input box
    error.value = "";
}

function backmen(){
    window.location.href = "../src/team.html";

}

function addteam() {



    // Pfad zur JSON-Datei
    const filePath = '../databank.json';

    // Lese die JSON-Datei und füge ein neues Team hinzu
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Fehler beim Lesen der Datei:', err);
            return;
        }

        try {
            // Parse das JSON
            const jsonData = JSON.parse(data);

            // Neues Teamobjekt
            const newTeam = {
                "teamname": addteambox.value
            };

            // Hinzufügen des neuen Teams zum Array "teams"
            jsonData.teams.push(newTeam);

            // Schreibe das aktualisierte JSON zurück in die Datei
            fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), (err) => {
                if (err) {
                    console.error('Fehler beim Schreiben der Datei:', err);
                    return;
                }
                console.log('Team wurde erfolgreich hinzugefügt!');
                // Liste der Teams aktualisieren
                updateTeamList(jsonData.teams);
            });
        } catch (error) {
            console.error('Fehler beim Parsen des JSON:', error);
        }
    });


}
function addplayer(){
    const selectedTeamName = localStorage.getItem('selectedTeam');
    const filePath = '../databank.json';
    const number = document.getElementById('addnumberbox').value;
    const posi = document.getElementById('addpositionbox').value;

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Fehler beim Lesen der Datei:', err);
            return;
        }

        try {
            // Parse das JSON
            const jsonData = JSON.parse(data);

            // Suche das ausgewählte Team im Array
            const selectedTeam = jsonData.teams.find(team => team.teamname === selectedTeamName);

            if (!selectedTeam) {
                console.error('Ausgewähltes Team nicht gefunden:', selectedTeamName);
                return;
            }

            // Überprüfe, ob das ausgewählte Team eine Spielerliste hat
            if (!selectedTeam.players) {
                console.error('Das ausgewählte Team hat keine Spielerliste:', selectedTeamName);
                selectedTeam.players = [];
            }

            // Neues Spielerobjekt
            const newPlayer = {
                "playernumber": number,
                "position": posi
            };

            // Hinzufügen des neuen Spielers zum ausgewählten Team
            selectedTeam.players.push(newPlayer);

            // Schreibe das aktualisierte JSON zurück in die Datei
            fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), (err) => {
                if (err) {
                    console.error('Fehler beim Schreiben der Datei:', err);
                    return;
                }
                console.log('Spieler wurde erfolgreich zum Team hinzugefügt!');
                // Liste der Teams aktualisieren
                updateplayerList(selectedTeam);
                        });
        } catch (error) {
            console.error('Fehler beim Parsen des JSON:', error);
        }
    });


}
// Funktion zur Aktualisierung der Teamliste auf der Benutzeroberfläche
function updateTeamList(teams) {
    const div = document.getElementById('teambtns');
    div.innerHTML = ''; // Alte Teamliste leeren
    teams.forEach(team => {
        allTeamNames = team.teamname 
        const div = document.getElementById('teambtns');
  var buttonEl = document.createElement("a");
const newButton = document.createElement('button');
newButton.textContent = team.teamname;
newButton.setAttribute('onclick', 'teamselected(this)');
newButton.className = "d-grid gap-2 col-6 mx-auto btn btn-primary tnteams"
buttonEl.appendChild(newButton);
document.getElementById('teambtns').appendChild(buttonEl);
allTeamNames = '';
    });
    closeaddwindow();
}


function updateplayerList(selectedTeam) {
    const div = document.getElementById('playerbtns');
    div.innerHTML = '';

    // Extrahiere die Spieler des ausgewählten Teams
    const playersinteam = selectedTeam.players;

    // Iteriere durch die Spieler des Teams und füge sie zur Liste hinzu
    playersinteam.forEach(player => {
        var buttonEl = document.createElement("a");
        const newButton = document.createElement('button');
        newButton.textContent = player.playernumber + " " + player.position;
        newButton.setAttribute('onclick', 'playerselected(this)');
        newButton.setAttribute('id', player.playernumber);
        newButton.className = "d-grid gap-2 col-6 mx-auto btn btn-primary tnteams"
        buttonEl.appendChild(newButton);
        document.getElementById('playerbtns').appendChild(buttonEl);
    });

    closeplayerdwindow(); // Schließe das Fenster nach dem Aktualisieren der Spielerliste
}

function read(event) {

    var selectarea = document.getElementById("selectarea");

    // Überprüfen, ob bereits ein Punkt vorhanden ist
    if (selectarea.querySelector(".point")) {
        // Wenn ein Punkt vorhanden ist, wird die Funktion abgebrochen und es wird kein neuer Punkt gesetzt
        alert("Es kann nur ein Punkt gesetzt werden.");
        return;
    }

    var rect = selectarea.getBoundingClientRect();
    var mouseX = event.clientX - rect.left;
    var mouseY = event.clientY - rect.top;
    localStorage.setItem('throwx', mouseX);
    localStorage.setItem('throwy', mouseY);
    console.log("X-Koordinate: " + mouseX + ", Y-Koordinate: " + mouseY);

    var point = document.createElement("div");
    point.className = "point";
    point.style.left = (mouseX - 5) + "px";
    point.style.top = (mouseY - 5) + "px";
    selectarea.appendChild(point);
}

function nextbutton(){
    var selectarea = document.getElementById("selectarea");
    var point = selectarea.querySelector(".point");
    if (point) {
    window.location.href = "../src/newgoal.html";
    } else {
        // Kein Punkt wurde platziert, zeige eine Meldung oder führe eine alternative Aktion aus
        alert("Es wurde kein Punkt platziert. Bitte zuerst einen Punkt setzen.");
        // Hier kannst du z.B. eine Meldung anzeigen oder eine andere Aktion ausführen
    }

}

function deletePoint() {
    var selectarea = document.getElementById("selectarea");
    var point = selectarea.querySelector(".point");
    if (point) {
        selectarea.removeChild(point);
    } else {
        console.log("Es gibt keinen Punkt zum Löschen.");
    }
}


function readgoal(event) {

    var selectareagoal = document.getElementById("selectareagoal");

    // Überprüfen, ob bereits ein Punkt vorhanden ist
    if (selectareagoal.querySelector(".pointgoal")) {
        // Wenn ein Punkt vorhanden ist, wird die Funktion abgebrochen und es wird kein neuer Punkt gesetzt
        alert("Es kann nur ein Punkt gesetzt werden.");
        return;
    }

    var rect = selectareagoal.getBoundingClientRect();
    var mouseX = event.clientX - rect.left;
    var mouseY = event.clientY - rect.top;
    localStorage.setItem('goalx', mouseX);
    localStorage.setItem('goaly', mouseY);
    console.log("X-Koordinate: " + mouseX + ", Y-Koordinate: " + mouseY);

    var point = document.createElement("div");
    point.className = "pointgoal";
    point.style.left = (mouseX - 5) + "px";
    point.style.top = (mouseY - 5) + "px";
    selectareagoal.appendChild(point);
}

function deletePointgoal() {
    var selectareagoal = document.getElementById("selectareagoal");
    var point = selectareagoal.querySelector(".pointgoal");
    if (point) {
        selectareagoal.removeChild(point);
    } else {
        console.log("Es gibt keinen Punkt zum Löschen.");
    }
}
function nogoal(){
    var selectareagoal = document.getElementById("selectareagoal");
    var point = selectareagoal.querySelector(".pointgoal");
    if (point) {
  localStorage.setItem('goal', 'false');
    savethrow();
    } else {
        // Kein Punkt wurde platziert, zeige eine Meldung oder führe eine alternative Aktion aus
        alert("Es wurde kein Punkt platziert. Bitte zuerst einen Punkt setzen.");
        // Hier kannst du z.B. eine Meldung anzeigen oder eine andere Aktion ausführen
    }
  

}

function goal(){
    var selectareagoal = document.getElementById("selectareagoal");
    var point = selectareagoal.querySelector(".pointgoal");
    if (point) {
    localStorage.setItem('goal', 'true');
    savethrow();
    } else {
        // Kein Punkt wurde platziert, zeige eine Meldung oder führe eine alternative Aktion aus
        alert("Es wurde kein Punkt platziert. Bitte zuerst einen Punkt setzen.");
        // Hier kannst du z.B. eine Meldung anzeigen oder eine andere Aktion ausführen
    }

}

function savethrow() {
    let posx = localStorage.getItem('throwx');
    let posy = localStorage.getItem('throwy');
    let goalx = localStorage.getItem('goalx');
    let goaly = localStorage.getItem('goaly');
    let goal = localStorage.getItem('goal'); 
    let team = localStorage.getItem('selectedTeam'); 
    let playerNumber = localStorage.getItem('playernumber');

    const filePath = '../databank.json';

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Fehler beim Lesen der Datei:', err);
            return;
        }

        try {
            // Parse das JSON
            const jsonData = JSON.parse(data);

            // Überprüfen, ob das jsonData-Objekt die erwartete Struktur hat
            // console.log('jsonData:', jsonData);

            // Suche den Spieler mit der angegebenen Nummer
            const player = jsonData.teams.flatMap(team => team.players).find(player => player.playernumber === playerNumber);

            // Überprüfen, ob der Spieler gefunden wurde
            // console.log('Gefundener Spieler:', player);

            if (!player) {
                console.error('Spieler mit der Nummer', playerNumber, 'nicht gefunden.');
                return;
            }

            // Überprüfen, ob der Spieler bereits einen Wurf hat
            if (!player.throws) {
                player.throws = []; // Erstelle eine neue leere Wurfliste, falls noch keine vorhanden ist
            }

            const newThrow = {
                "posx": posx,
                "posy": posy,
                "goalx": goalx,
                "goaly": goaly,
                "goal": goal
            };

            // Füge den neuen Wurf zum Spieler hinzu
            player.throws.push(newThrow);

            // Schreibe das aktualisierte JSON zurück in die Datei
            fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), (err) => {
                if (err) {
                    console.error('Fehler beim Schreiben der Datei:', err);
                    return;
                }
                console.log('Neuer Wurf wurde erfolgreich hinzugefügt!');
                window.location.href = "../src/playermenu.html";
            });
        } catch (error) {
            console.error('Fehler beim Parsen des JSON:', error);
        }
    });
}


function loadPlayerThrows() {
    const filePath = '../databank.json';
    let playerNumber = localStorage.getItem('playernumber');


    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Fehler beim Lesen der Datei:', err);
            return;
        }

        try {
            // Parse das JSON
            const jsonData = JSON.parse(data);

            // Suche den Spieler mit der angegebenen Nummer
            const player = jsonData.teams.flatMap(team => team.players).find(player => player.playernumber === playerNumber);

            if (!player) {
                console.error('Spieler mit der Nummer', playerNumber, 'nicht gefunden.');
                return;
            }

            // Überprüfen, ob der Spieler Würfe hat
            if (!player.throws || player.throws.length === 0) {
                console.log('Der Spieler hat keine Würfe.');
                return;
            }

            // Anzeigen der Variablen der Würfe des Spielers
            console.log('Würfe des Spielers', player.playernumber, ':');
            player.throws.forEach((throwData, index) => {
                var pointgoal = document.createElement("div");
                pointgoal.className = "pointgoal2";
                pointgoal.style.left = (throwData.goalx - 5) + "px";
                pointgoal.style.top = (throwData.goaly - 5) + "px";
                if (throwData.goal === 'true') {
                    // Wenn das Ziel false ist, setzen Sie die Hintergrundfarbe auf grün (als RGB)
                    pointgoal.style.backgroundColor = "rgb(0, 128, 0)"; // Grünes RGB: (0, 128, 0)
                } else {
                    // Wenn das Ziel nicht false ist (wahrscheinlich true), setzen Sie die Hintergrundfarbe auf rot (als RGB)
                    pointgoal.style.backgroundColor = "rgb(255, 0, 0)"; // Rotes RGB: (255, 0, 0)
                }
                
                pointgoal.textContent = index + 1;
                selectareagoal.appendChild(pointgoal);
                var point = document.createElement("div");
                point.className = "point";
                point.style.left = (throwData.posx - 5) + "px";
                point.style.top = (throwData.posy - 5) + "px";
                point.textContent = index + 1;
                selectarea.appendChild(point);
                console.log('Wurf', index + 1, ':');
       
                console.log('  Ziel X:', throwData.goalx);
                console.log('  Ziel Y:', throwData.goaly);
                console.log('  Tor:', throwData.goal);
            });
        } catch (error) {
            console.error('Fehler beim Parsen des JSON:', error);
        }
    });
}

// Beispielaufruf: Laden und Anzeigen der Würfe des Spielers mit der Nummer 19

function gotodisplay(){
    window.location.href = "../src/displaythrows.html";

}

function goplyermenu(){
    window.location.href = "../src/playermenu.html";

}