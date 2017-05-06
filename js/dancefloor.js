//Nombre de lignes du tableau
var nbLignes = 10
//Nombre de colonnes
var nbColonnes = 30

/*
* Dessine une table HTML de nbLignes x nbColonnes dans
* la balise d'identifiant 'disco'.
* Chaque cellule du tableau à un identifiant de la forme 'x,y'
* avec x = numéro de ligne, y = numéro de colonne
*/
function dessinerDancefloor() {
	//Génération de la table.
	var table = "<table>"
	for (var x = 0; x < nbLignes; x++) {
		table += "<tr>"
		for (var y = 0; y < nbColonnes; y++) {			
			table += "<td id='" + x + "," + y + "' class='cell'></td>" 
		}
		table += "</tr>";
	}
	table += "</table>"
	//Recupération de la zone d'acceuil de la table et insertion
	var d = document.getElementById("disco")
	d.innerHTML = table
}


function colorier(x, y, c){
	var id = document.getElementById(x+","+y);
	//var y = document.getElementById("y")
	id.style.backgroundColor=c;
}

function getCase(){
	var requette = new XMLHttpRequest();
	requette.open('GET','http://localhost/~vincent/tp6/ping.php?nbLignes='+nbLignes+'&nbColonnes='+nbColonnes)
	requette.onreadystatechange = function(){
		if(requette.readyState == 4){
			if(requette.status == 200){
				//console.log(requette.responseText);
				var ressus = JSON.parse(requette.responseText);
				//console.log(ressus.x);
				colorier(ressus.x,ressus.y,ressus.color)

			}else{
				console.log('Erreur.code='+requette.status);
			}
		}
			
	}
	requette.send();
}

function go(){
	dessinerDancefloor();
	window.setInterval(getCase, 10);
}

//A completer