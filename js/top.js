/*
Script pour modifier le classement des heroes
*/

function change(op, x) {

	var requette = new XMLHttpRequest();
	requette.open('POST',"http://localhost/~vincent/tp6/change.php")
	requette.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	requette.onreadystatechange = function(){
			if(requette.readyState == 4){
			if(requette.status == 200){
				switch(op){
					case 'dec':
						swap(x,x-1);
						break;
					case 'inc':
						swap(x,x+1);
						break;
				}

			}else{
				console.log('Erreur.code='+requette.status);
			}
		}

	}
	requette.send("op="+op+"&"+"pos="+x);
	console.log("Il faut changer le classement du héro" + x + ". Opération: " + op);
}

function swap(x,y){
	var posx = document.getElementById("pos-"+(x))
	var posy = document.getElementById("pos-"+(y))
	console.log(posx);
	var htmlx = posx.innerHTML; 
	posx.innerHTML = posy.innerHTML;
	posy.innerHTML = htmlx;
}