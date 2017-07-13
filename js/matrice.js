//import {Case, CaseHerbe, CaseChemin, CaseEau, CaseArbre, CaseConstructible, CaseToure} from "case";

	var canvas;
	var graphique;




class Matrice {  //Class qui comporte toute les fonction d'accé à la grille contenant les Case de la partie

		constructor(largeur, hauteur, nbPixel){

			this.nbColonnes = largeur;
			this.nbLignes = hauteur;
			this.cote = nbPixel;

			this.carte = new Array();
			this.donne = "";
			this.imageFont = new Image();
			this.imageFont.src = "image/texture/terrain.jpg";
			this.imageFont.src = "image/texture/terrain.jpg";
			canvas = document.getElementById('mon_canvas');

		    if(!canvas)
		    {
		        alert("Impossible de récupérer le canvas");
		        return;
		    }

		    graphique = canvas.getContext('2d');
		    if(!graphique)
		    {
		        alert("Impossible de récupérer le context du canvas");
		        return;
		    }

		    canvas.width = this.nbColonnes*this.cote;
		    canvas.height = this.nbLignes*this.cote;
		    
		}
	

	getNbColonnes(){
		return this.nbColonnes;
	}

	getNbLignes(){
		return this.nbLignes;
	}

	getCote(){
		return this.cote;
	}

	setNbColonnes(col){
		this.nbColonnes = col;
	}

	setLignes(lig){
		this.nbLignes = lig;
	}

	setCote(c){
		this.cote = c;
	}

	setCase(X, Y, case1){
		this.carte[X][Y] = case1;
		this.carte[X][Y].dessinCase();
	}

	getCase(X, Y){
		return this.carte[X][Y];
	}

	getCaseDebut(){	//Donne le case du début du chemin (pour positionné les monstre en début de vague)
		for(var x = 0; x<this.nbColonnes; x++){
			if(this.carte[x][0].estChemin()){
				return this.carte[x][0];
			}
		}
	}

	getCaseFin(){	//Donne la dernière case du chemin, qui fait perdre la partie quand un monstre arrive dessus
		for(var x = 0; x<this.nbColonnes; x++){
			if(this.carte[x][this.nbLignes-1].estChemin()){
				return this.carte[x][this.nbLignes-1];
			}
		}
	}

	ajouteCarte(donne){	//Place les donne obetenue par le fichier Json envoyé par le serveur, en atribuant un type de case à une coordonnée en fonction de la valeur

		this.nbColonnes = donne.largeur;
		this.nbLignes = donne.hauteur;

		

		for(var x = 0; x<this.nbColonnes; x++){
			this.carte[x] = new Array();
		}

				for(var x = 0; x<this.nbColonnes; x++){
					for(var y = 0; y<this.nbLignes; y++){
						var typeCase = donne.carte[y][x].typeCase;
						
						switch(typeCase){
							case 1:
								this.carte[x][y] = new CaseHerbe(x,y,this.cote);
								this.carte[x][y].dessinCase();
							break;

							case 2:
								this.carte[x][y] = new CaseArbre(x,y,this.cote);
								this.carte[x][y].dessinCase();
							break;

							case 3:
								this.carte[x][y] = new Case(x,y,this.cote);
								this.carte[x][y].dessinCase();
								this.carte[x][y] = new CaseChemin(x,y,this.cote);
								this.carte[x][y].dessinCase();
							break;

							case 4:
								this.carte[x][y] = new CaseEau(x,y,this.cote);
								this.carte[x][y].dessinCase();
							break;

							case 5:
								this.carte[x][y] = new CaseConstructible(x,y,this.cote);
								this.carte[x][y].dessinCase();
							break;

							case 6:
								this.carte[x][y] = new Case(x,y,this.cote);
								this.carte[x][y].dessinCase();
							break;


							default:
								this.carte[x][y] = new Case(x,y,this.cote);
								this.carte[x][y].dessinCase();
							break;
						}
						
			}
		}
	}

	rafraichieMatrice(){	//Suprime toute les cases dessiné puis les redessine (pour rafraichir l'affichage à chaque frame)
		graphique.drawImage(this.imageFont, 1, 1, this.imageFont.width, this.imageFont.height, 0, 0, this.cote*this.nbColonnes, this.cote*this.nbLignes);
		for(var x = 0; x<this.nbColonnes; x++){
			for(var y = 0; y<this.nbLignes; y++){
				this.carte[x][y].dessinCase();
					
			}
				
		}
	}

	construireToure(x,y){	//Ajoute une toure de base
	this.carte[x][y] = new CaseToure(x,y,this.cote,2, 2, 200, 3);
	this.carte[x][y].dessinCase();
	}


}

var mat;
var caseCourante;
var nbvague = 1;
var phase = "construction"
var piece = 120;
var attaqueAnim;

window.onload = function(){	//Fonction qui est lancé lorsque la page a fini d'être chargé par le navigateur
	
	mat = new Matrice(20,30,80);
	canvas.addEventListener("mousedown", zoneClique, false);
	



	recupereDonne("foret");

	new CaseToure(1,1,15, 1, 1, 1, 1);	//Appelle une première fois les objet des différente toure pour préchargé leur image.
	new CaseToure(1,1,1, 15, 1, 1, 1);
	new CaseToure(1,1,1, 1, 5, 1, 1);
	new CaseToure(1,1,15, 1, 1, 350, 1);
	new CaseToure(1,1,15, 1, 1, 1, 15);


	new Orc(520,10,70,80,"B",2);
	new Goule(500,10,70,80,"B",4);
	

	var son = document.getElementById("musique");
	son.innerHTML = "<embed src='musique/Human Theme.mp3' hidden=true autostart=true loop=true mastersound>";

	
}


	function chargeMap(nom){	//Est appelé pour charger une autre carte ou recommancé la partie
		clearInterval(attaqueAnim);
		var son = document.getElementById("musique");
		son.innerHTML = "<embed src='musique/Human Theme.mp3' hidden=true autostart=true loop=true mastersound>";
		recupereDonne(nom);
		nbvague = 1;
		phase = "construction";
		piece = 120;
		caseCourante = mat.getCase(0,0);
		document.getElementById("vague").innerHTML = "Vague: "+nbvague;
		document.getElementById("nbmonstre").innerHTML = "";
		document.getElementById("or").innerHTML = piece +" or";
		interface();
	}

	function recupereDonne(nomMap) {	//Envoie une requette eu serveur puis récupère le fichier Json qui lui a été envoyé par le serveur en réponse
		var xhr = new XMLHttpRequest();
		xhr.open('GET',"serveurTowerDefense.php?action=recup&map="+nomMap);
		xhr.onreadystatechange = function(){
		if(xhr.readyState == 4){
				if(xhr.status == 200){
					donne = JSON.parse(xhr.responseText);
					mat = new Matrice(donne.largeur,donne.hauteur,80);
					mat.ajouteCarte(donne);
					mat.rafraichieMatrice();

					document.getElementById("vague").innerHTML = "Vague: "+nbvague;
					document.getElementById("nbmonstre").innerHTML = "";
					document.getElementById("or").innerHTML = piece +" or";


				}else{
					consol.log("erreur.code="+xhr.status);
				}
			}
		}
		xhr.send();

	}


    function zoneClique(event){	//Renvoie la coordonnée d'un clic sur le caneva en fonction du scroll


		x = event.clientX + document.body.scrollLeft+document.documentElement.scrollLeft; // Fonctionne sur tout les navigateur que l'on a testé
		y = event.clientY + document.body.scrollTop + document.documentElement.scrollTop;

	    x -= canvas.offsetLeft;
	    y -= canvas.offsetTop;


	  	x/=mat.getCote();
	  	y/=mat.getCote();
	  	x = Math.trunc(x);
	  	y = Math.trunc(y);
	  	
	  	caseCourante = mat.getCase(x,y);
	  	interface();

	}


function vagueSuivante(){
	if(phase == "construction"){
		phase = "defense";
		vague(nbvague);
	}
	
}



function vague(num_vague){	//Envoie et anime les toure et monstre durant la pahe attaque

	var nb_monstre = num_vague*5;
	var monstres = new Array();
	var nb_m_total = num_vague*5;

	var image = new Image();
	image.src = "image/defaite.png";
	graphique.drawImage(image, 0, 0, image.width, image.height, 400, 350, 300, 100);

	var son = document.getElementById("musique");

	son.innerHTML = "<embed src='musique/Lich King Theme.mp3' hidden=true autostart=true loop=true mastersound>";

	var premierCase = mat.getCaseDebut();
	x = premierCase.getPosition().x*mat.getCote();
	y = premierCase.getPosition().y*mat.getCote();
	y = 30;
	x1 = mat.getCaseDebut().x*mat.getCote()+5;

	var vie = 0;

	if( num_vague>3){	//Definie la vide des monstres en fonction de la vague
		vie = Math.pow(3,num_vague);
	}
	

	if (num_vague%3==0){	//Génération des monstres de type aérien

		for (var i=0;i<num_vague/3;i++){
			x = x1 + valAleatoire(-120,120);
			monstres.push(new Dragon(x,y,50+vie,150,"B",2)); // x y vie cote direction vitesse
			x = x1 + valAleatoire(-100,100);
			monstres.push(new Griffon(x,y,50+vie,110,"B",3));
			nb_monstre-=2;
			
		}

	}

	if( num_vague>3){
		vie = Math.pow(3.5,num_vague);
	}

	var nbMAl = Math.random()*(nb_monstre/3);
	nbMAl = Math.trunc(nbMAl);

	for (var i=0;i<nbMAl;i++){		//Génération des monstre terrestre
		 x = x1 + valAleatoire(0,40);
		monstres.push(new Orc(x,y,42+vie,70,"B",3));
	}
	nb_monstre -= nbMAl;
	nbMAl = Math.random()*(nb_monstre/2);
	nbMAl = Math.trunc(nbMAl);

	if( num_vague>3){
		vie = Math.pow(2.5,num_vague);
	}

	for (var i=0;i<nbMAl;i++){
		x = x1 + valAleatoire(0,40);
		monstres.push(new Troll(x+Math.trunc(Math.random()*10),y,35+vie,70,"B",2));
	}

	nb_monstre -= nbMAl;

	if( num_vague>3){
		vie = Math.pow(2,num_vague);
	}

	for (var b=0;b<nb_monstre;b++){
		x = x1 + valAleatoire(0,40);
		monstres.push(new Goule(x,y,25+vie,70,"B",1));

	}

	var phaseA = false;

	attaqueAnim = setInterval(function(){	//Répète 30 fois la seconde le déplacement de toutes les unité et lance les ataques des toure sur le monstres
		graphique.clearRect(0, 0, canvas.width, canvas.height);
    	graphique.beginPath();
    	mat.rafraichieMatrice();

		for(var i in monstres){
			var monstre = monstres[i];
			if(seDeplacer(monstre)){
				phaseA = true;
			}
			else{
				for(var colonne=0; colonne<mat.getNbColonnes(); colonne++){
					for(var ligne=0; ligne<mat.getNbLignes(); ligne++){
						if(monstres.length <= 0){
							phaseA = true;
							break;
						}
						if(mat.getCase(colonne, ligne).estToure()){
							if(!mat.getCase(colonne, ligne).attaque(monstre)){
								piece += monstre.getPiece();
								document.getElementById("or").innerHTML = piece + " or";

								monstres.splice(monstres.indexOf(monstre),1)
								if(monstres.length <= 0){
									mat.rafraichieMatrice();
									phaseA = true;
									break;
								}
							}
						}
					}
				}

				document.getElementById("nbmonstre").innerHTML = "Monstre restant: "+Math.trunc(nb_m_total - (nb_m_total-monstres.length));
			}
		}
		if(phaseA == true){
			fin();
		}
	}, 1000/30);

	function fin(){
		clearInterval(attaqueAnim);
		if(monstres.length == 0){	//Met le jeux dans une phase de contruction, la vague et fini, et se met dans l'atente de la suivante
			nbvague++;
			var son = document.getElementById("musique");

			son.innerHTML = "<embed src='musique/Human Theme.mp3' hidden=true autostart=true loop=true mastersound>";
			document.getElementById("vague").innerHTML = "Vague: "+nbvague;
			document.getElementById("nbmonstre").innerHTML = "Vague finie";
			phase = "construction";
		}
		else{	//La partie est fini

			image.src = "image/defaite.png";
			graphique.drawImage(image, 0, 0, image.width, image.height, 290, 330, 620, 180);


			graphique.fillStyle = "red";
			graphique.font = "30px Arial";
			graphique.fillText("Vous avez failli à votre tâche!",400,400);
			graphique.fillText("La horde est passé!",400,430);
		}
	}



}


function interface(){	//Affiche tout les éléments d'intéraction sur les case par le joueur en fonction du type de case sélectionné
	document.getElementById("or").innerHTML = piece + " or";

	caseCourante.dessineDansInterface();
	var don = document.getElementById("donnee");
	var ame = document.getElementById("amelioration");

	if(phase == "construction"){
		if(caseCourante.estToure()){
			don.style.visibility = "visible";
			ame.style.visibility = "visible";

			ame.innerHTML = amelioration();
			don.innerHTML = information(caseCourante.getPuissanceAttTer(),caseCourante.getPuissanceAttAer(),caseCourante.getZonneAtt(),caseCourante.getFrequenceTir());
		
		}else if(caseCourante.estConstructible()){
			don.style.visibility = "visible";
			ame.style.visibility = "visible";

			ame.innerHTML = amelioration();
			don.innerHTML = "<ul><li>Nature</li></ul>";
		}else{
			don.style.visibility = "visibile";
			ame.style.visibility = "hidden";

			don.innerHTML = "<ul><li>Nature</li></ul>";
		}
	}else{
		if(caseCourante.estToure()){
			don.style.visibility = "visible";
			ame.style.visibility = "hidden";
			ame.innerHTML = amelioration();
			don.innerHTML = information(caseCourante.getPuissanceAttTer(),caseCourante.getPuissanceAttAer(),caseCourante.getZonneAtt(),caseCourante.getFrequenceTir());
		
		}else if(caseCourante.estConstructible()){
			don.style.visibility = "visible";
			ame.style.visibility = "hidden";

			ame.innerHTML = amelioration();
			don.innerHTML = "<ul><li>Nature</li></ul>";
		}else{
			don.style.visibility = "visible";
			ame.style.visibility = "hidden";
			don.innerHTML = "<ul><li>Nature</li></ul>";
		}
	}

}


function information(pat,paa,dt,ft){
	var html = "";
	html = "<ul>\
		<li>Puissance Attaque Terrestre : "+pat+"</li>\
	    <li>Puissance Attaque Aérien : "+paa+"</li>\
	    <li>Distance de tir : "+Math.round(10*dt/mat.getCote())/10+" case</li>\
	    <li>Frequence de tir : "+ft+" tir/s</li>\
	    </ul>";
	return html;
}

function amelioration(){
	var html = "";
	if(caseCourante.estToure()){
		    html = "Amélioration: (10 or)\
            <table>\
              <tr>\
                <td><input type=\"button\" value=\"Attaque Terrestre\" onclick=\"ameliore(\'pat\')\"></td>\
                <td><input type=\"button\" value=\"Attaque Aérien\" onclick=\"ameliore(\'paa\')\"></td>\
              </tr>\
              <tr>\
                <td><input type=\"button\" value=\"Distance de tir\" onclick=\"ameliore(\'dt\')\"></td>\
                <td><input type=\"button\" value=\"Frequence de tir\" onclick=\"ameliore(\'ft\')\"></td>\
              </tr>\
              <tr>\
                <td><input type=\"button\" value=\"Detruire tour\" onclick=\"ameliore(\'det\')\"></td>\
              </tr>\
            </table>";

	}else if(caseCourante.estConstructible()){
		x = caseCourante.getPosition().x;
		y = caseCourante.getPosition().y;
		html = "Construire:\
            <table>\
            	<tr>\
            	<td><input type=\"button\" value=\"Créer une tour : 5 or\" onclick=\"ajouteToure("+x+","+y+")\"></td>\
            	</tr>\
        	</table>";
	}else{
		html = "";
	}
	return html;
}

function ajouteToure(x,y){
	piece -= 5;
	mat.construireToure(x,y);
	caseCourante = mat.getCase(x,y);
	interface();
}


function ameliore(type){	//Améliore les toure si il y suffisament d'or
	if(type == "det"){
		piece += Math.trunc((mat.getCase(x,y).getPuissanceAttTer()+mat.getCase(x,y).getZonneAtt()+mat.getCase(x,y).getFrequenceTir()+mat.getCase(x,y).getZonneAtt()/100)/20);
		mat.setCase(x,y, new CaseConstructible(x,y,mat.getCote()));
		mat.getCase(x,y).dessinCase();
		caseCourante = mat.getCase(x,y);
		interface();
	}
	if(piece>=10){
		x = caseCourante.getPosition().x;
		y = caseCourante.getPosition().y;
		switch(type){
			case "pat":
				mat.getCase(x,y).setPuissanceAttTer(mat.getCase(x,y).getPuissanceAttTer()+2);
				piece -= 10;
			break;
			case "paa":
				mat.getCase(x,y).setPuissanceAttAer(mat.getCase(x,y).getPuissanceAttAer()+2);
				piece -= 10;
			break;
			case "dt":
				if(mat.getCase(x,y).setZonneAtt(mat.getCase(x,y).getZonneAtt()+50)){
					piece -= 10;
				}
			break;
			case "ft":
				if (mat.getCase(x,y).setFrequenceTir(mat.getCase(x,y).getFrequenceTir()+1)){
					piece -= 10;
				}
			break;
		}

		mat.getCase(x,y).dessinCase();
		caseCourante = mat.getCase(x,y);
		interface();
	}

}

function valAleatoire(min, max) {	//Génère une valeur alétoire compris dans un inytervale
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function seDeplacer(monstre){	//Fait avancé un montre d'une distance égale à sa vitesse en fonction du chemin et ça direction initiale
	x = monstre.getPosition().x;
	y = monstre.getPosition().y;
	X = x/mat.getCote();
	Y = y/mat.getCote();
	X = Math.trunc(X);
	Y = Math.trunc(Y);

	var direction = monstre.getDirection();

	var postx = x;
	var posty = y;
	var vitesse = monstre.getVitesse();
	if(monstre.estVolante()){
		posty = y + vitesse;
		postx = x;
		if (posty >= mat.getNbLignes()*mat.getCote()){
			return true;
		}
		else{
			monstre.setPosition(postx, posty);
			monstre.dessineMonstre();
			monstre.barreVie();
			return false;
		}
	}

	if(direction == "B"){	//Le monstre est en train de descendre
		
		if(mat.getCase(X,Math.trunc(y/mat.getCote()+vitesse/mat.getCote())).estChemin()){
			posty = y + vitesse;
			postx = x;
		}else{
			if(mat.getCase(X+1,Y).estChemin()){	//Si la prochaine case n'est pas un chemin, alors il tourne à droite au gauche
				direction = "D";
			}else{
				direction = "G";
			}
			postx = x;
			posty = Math.trunc(valAleatoire(Y*mat.getCote()+mat.getCote()/2, (Y+1)*mat.getCote()-mat.getCote()/6));
		}

	}else if(direction == "H"){
		
		if(mat.getCase(X,Math.abs(Math.trunc(y/mat.getCote()-vitesse/mat.getCote()))).estChemin()){
			posty = y - vitesse;
			postx = x;
		}else{
			if(mat.getCase(Math.abs(X-1),Y).estChemin()){
				direction = "G";
			}else{
				direction = "D";
			}
			postx = x;
			posty = y;
		}

	}else if(direction == "D"){	//Le montre va vers la droite
		if(mat.getCase(Math.trunc(x/mat.getCote()+vitesse/mat.getCote()),Y).estChemin()){
			postx = x + vitesse;
			posty = y;
		}else{
			if(mat.getCase(X,Y+1).estChemin()){	//Si la prochaine case n'est pas un chemin alors il tourne vers le haut ou vers le bas
				direction = "B";
			}else{
				direction = "H";
			}
			postx = Math.trunc(valAleatoire(X*mat.getCote()+mat.getCote()/2, (X+1)*mat.getCote()-mat.getCote()/6));
			posty = y;
		}

	}else if(direction == "G"){
		if(mat.getCase(Math.trunc(x/mat.getCote()-vitesse/mat.getCote()),Y).estChemin()){
			postx = x - vitesse;
			posty = y;
		}else{
			if(mat.getCase(X,Math.abs(Y-1)).estChemin()){
				direction = "H";
			}else{
				direction = "B";
			}
			postx = x;
			posty = y;
		}

	}

	if (mat.getCase(X,Y)==mat.getCaseFin()){
		return true;
	}
	
	else {	//Met à jour les coordonnée du monstre
		monstre.setPosition(postx, posty);
		monstre.dessineMonstre();
		monstre.barreVie();
		monstre.setDirection(direction);
		return false;
	}
}





class Case {	//Classe Case qui constitue la grille
	constructor(x,y,cote){
		this.cote = cote;
		this.x = x;
		this.y = y;
		this.image = new Image();
		this.image.src = "image/texture/terre1.JPG";
		this.coeffDep = 10;
		this.coteDec = this.cote+this.cote/this.coeffDep
		//graphique.drawImage(this.image, 1, 1, this.image.width, this.image.height, this.x*this.cote-this.cote/this.coeffDep, this.y*this.cote-this.cote/this.coeffDep, this.coteDec, this.coteDec);
	}

	getCote(){
		return this.cote;
	}

	dessinCase(){
		graphique.drawImage(this.image, 1, 1, this.image.width, this.image.height, this.x*this.cote-this.cote/(this.coeffDep*2), this.y*this.cote-this.cote/(this.coeffDep*2), this.coteDec, this.coteDec);
	}

	estChemin(){
		return false;
	}

	estConstructible(){
		return false;
	}

	estToure(){
		return false;
	}

	dessineDansInterface(){
		var img = document.getElementById("imageToure");
		img.src = this.image.src;
	}

	getPosition(){
		return {"x" : this.x, "y" : this.y};
	}

	
}


class CaseEau extends Case{
	
	constructor(x,y,cote){
		super(x, y, cote);
		this.image = new Image();
		this.image.src = "image/texture/eau.gif";
		this.coteDec = this.cote+this.cote/this.coeffDep
		//graphique.drawImage(this.image, 1, 1, this.image.width, this.image.height, this.x*this.cote-this.cote/this.coeffDep, this.y*this.cote-this.cote/this.coeffDep, this.coteDec, this.coteDec);
	}

	dessinCase(){
		graphique.drawImage(this.image, 1, 1, this.image.width, this.image.height, this.x*this.cote-this.cote/(this.coeffDep*2), this.y*this.cote-this.cote/(this.coeffDep*2), this.coteDec, this.coteDec);
	}

}


class CaseArbre extends Case{
	constructor(x,y,cote){
		super(x, y, cote);
		this.image = new Image();
		this.image.src = "image/texture/arbre2.png";
		this.coteDec = this.cote+this.cote/this.coeffDep
		//graphique.drawImage(this.image, 1, 1, this.image.width, this.image.height, this.x*this.cote-this.cote/this.coeffDep, this.y*this.cote-this.cote/this.coeffDep, this.coteDec, this.coteDec);
	}

	dessinCase(){
		graphique.drawImage(this.image, 1, 1, this.image.width, this.image.height, this.x*this.cote-this.cote/(this.coeffDep*2), this.y*this.cote-this.cote/(this.coeffDep*2), this.coteDec, this.coteDec);
	}


}

class CaseHerbe extends Case{

	constructor(x,y,cote){
		super(x, y, cote);
		this.image = new Image();
		this.image.src = "image/texture/herbe.png";
		this.coteDec = this.cote+this.cote/this.coeffDep
		//graphique.drawImage(this.image, 1, 1, this.image.width, this.image.height, this.x*this.cote-this.cote/(this.coeffDep*2), this.y*this.cote-this.cote/(this.coeffDep*2), this.coteDec, this.coteDec);
	}

	dessinCase(){
		graphique.drawImage(this.image, 1, 1, this.image.width, this.image.height, this.x*this.cote-this.cote/(this.coeffDep*2), this.y*this.cote-this.cote/(this.coeffDep*2), this.coteDec, this.coteDec);
	}
} 

class CaseConstructible extends Case{
	constructor(x,y,cote){
		super(x, y, cote);
		this.image = new Image();
		this.image.src = "image/texture/baseToure.png";
		this.coteDec = this.cote+this.cote/this.coeffDep
		//graphique.drawImage(this.image, 1, 1, this.image.width, this.image.height, this.x*this.cote-this.cote/this.coeffDep, this.y*this.cote-this.cote/this.coeffDep, this.coteDec, this.coteDec);
	}

	dessinCase(){
		graphique.drawImage(this.image, 1, 1, this.image.width, this.image.height, this.x*this.cote-this.cote/(this.coeffDep*2), this.y*this.cote-this.cote/(this.coeffDep*2), this.coteDec, this.coteDec);
	}


	estConstructible(){
		return true;
	}
}

class CaseChemin extends Case{
	constructor(x,y,cote){
		super(x, y, cote);
		this.image = new Image();
		this.image.src = "image/texture/chemin.png";
		this.coteDec = this.cote+this.cote/this.coeffDep
		//graphique.drawImage(this.image, 1, 1, this.image.width, this.image.height, this.x*this.cote-this.cote/this.coeffDep, this.y*this.cote-this.cote/this.coeffDep, this.coteDec, this.coteDec);
	}

	dessinCase(){
		graphique.drawImage(this.image, 1, 1, this.image.width, this.image.height, this.x*this.cote-this.cote/(this.coeffDep*2), this.y*this.cote-this.cote/(this.coeffDep*2), this.coteDec, this.coteDec);
	}


	estChemin(){
		return true;
	}
}


class CaseToure extends Case{
	constructor(x,y,cote, pAttT, pAttAe, zoneAtt, freqTir){
		super(x, y, cote);
		this.pAttT = pAttT;
		this.pAttAe = pAttAe;
		this.zoneAtt = zoneAtt;
		this.freqTir = freqTir;
		this.nbTire = 0;
		this.image = new Image();
		this.image.src = "image/toure/toure1.PNG";
		this.coteDec = this.cote+this.cote/this.coeffDep;
		//graphique.drawImage(this.image, 1, 1, this.image.width, this.image.height, this.x*this.cote-this.cote/this.coeffDep, this.y*this.cote-this.cote/this.coeffDep, this.coteDec, this.coteDec);
	}

	getPuissanceAttTer(){
		return this.pAttT;
	}

	getPuissanceAttAer(){
		return this.pAttAe;
	}

	getZonneAtt(){
		return this.zoneAtt;
	}

	getFrequenceTir(){
		return this.freqTir;
	}

	setPuissanceAttTer(p){
		this.pAttT = p;
	}

	setPuissanceAttAer(p){
		this.pAttAe = p;
	}

	setZonneAtt(z){
		if(this.zoneAtt<500){
			this.zoneAtt = z;
			return true;
		}
		else{
			return false;
		}
	}

	setFrequenceTir(f){
		if(this.freqTir<25){
			this.freqTir = f;
			return true;
		}
		else{
			return false;
		}
	}

	dessinCase(){	//Dessine une toure en fonction de c'est caractéristique
		if(this.pAttT >= 15 || this.pAttAe >= 15){
			this.image.src = "image/toure/toure4.PNG";
		}
		else if(this.zoneAtt >= 500){
			this.image.src = "image/toure/toure2.PNG";
		}
		else if(this.freqTir >= 8){
			this.image.src = "image/toure/toure3.PNG";
		}
		graphique.drawImage(this.image, 1, 1, this.image.width, this.image.height, this.x*this.cote-this.cote/(this.coeffDep*2), this.y*this.cote-this.cote/(this.coeffDep*2), this.coteDec, this.coteDec);
	}

	estConstructible(){
		return false;
	}

	estToure(){
		return true;
	}

	attaque(monstre){	//Attaque un monstre si il est à porté et que la toure est rechargé
	
		if(this.nbTire >= 500/this.freqTir){ //L'animation est configurer à 30 fps, donc pour avoir un nombre de tire par seconde il y a le coeff 33.333 
			var distance = Math.pow(monstre.getPosition().x - (this.x*this.cote+this.cote/2), 2)+Math.pow(monstre.getPosition().y - (this.y*this.cote+this.cote/2), 2);
			distance = Math.sqrt(distance);
			distance = Math.trunc(distance);
			
			if(distance <= this.zoneAtt){
				if(monstre.estVolante()){
					monstre.setVie(monstre.getVie()-this.pAttAe*valAleatoire(0.7,1));
				}
				else{
					monstre.setVie(monstre.getVie()-this.pAttT*valAleatoire(0.7,1));
				}
				
 				graphique.strokeStyle='yellow';
 				graphique.lineWidth=5; 
 				graphique.moveTo(this.x*this.cote+this.cote/2,this.y*this.cote+this.cote*1/3);
 				graphique.lineTo(monstre.getPosition().x,monstre.getPosition().y);
 				graphique.stroke();
				this.nbTire = 0;
				
			}

		}else{
			this.nbTire++;
		}
		if(monstre.getVie()<= 0){
			return false;
		}
		else{
			return true;
		}
	}


}







class Unite {	//Classe qui est érité par tout les différents type de monstre
	constructor(x,y,vie,cote,direction,vitesse){
		this.cote = cote;
		this.x = x;
		this.y = y;
		this.vie = vie;
		this.vieMax = vie;
		this.direction = direction;
		this.vitesse = vitesse;
		this.image = new Image();
	}

	setPosition(X,Y){
		this.x = X;
		this.y = Y;
	}

	getPosition(){
		return {"x" : this.x, "y" : this.y};
	}

	setVie(v){
		this.vie = v;
	}

	getVie(){
		return this.vie;
	}

	getVieMax(){
		return this.vieMax;
	}

	setDirection(dire){
		this.direction = dire;
	}

	getDirection(){
		return this.direction;
	}

	getVitesse(){
		return this.vitesse;
	}

	setVitesse(v){
		this.vitesse = v;
	}

	estVolante(){
		return false;
	}

	barreVie(){
		var longueur = Math.trunc((this.vie*this.cote/2)/this.vieMax);
		graphique.fillStyle = "green";
		graphique.fillRect(this.x, this.y-this.cote/2, longueur, 4);
		graphique.strokeStyle = "black";

		graphique.lineWidth = 1; 
		graphique.strokeRect(this.x, this.y-this.cote/2, this.cote/2, 4);
	}

}

class Aerien extends Unite{
	constructor(x,y,vie,cote,direction,vitesse){
		super(x,y,vie,cote,direction,vitesse);
		graphique.drawImage(this.image, 0, 0, this.image.width, this.image.height, this.x-this.cote/2, this.y-this.cote/2, this.cote, this.cote);
	}

	estVolante(){
		return true;
	}

}

class Terrestre extends Unite{
		constructor(x,y,vie,cote,direction,vitesse){
		super(x,y,vie,cote,direction,vitesse);
		graphique.drawImage(this.image, 0, 0, this.image.width, this.image.height, this.x-this.cote/2, this.y-this.cote/2, this.cote, this.cote);
	}

}

class Dragon extends Aerien{
	constructor(x,y,vie,cote,direction,vitesse){
		super(x,y,vie,cote,direction,vitesse);
		console.log(direction)
		this.image.src = "image/monstre/dragonB.PNG";
		graphique.drawImage(this.image, 0, 0, this.image.width, this.image.height, this.x-this.cote/2, this.y-this.cote/2, this.cote, this.cote);
		
	}

	dessineMonstre(){
		this.image.src = "image/monstre/dragon"+this.direction+".PNG";
		graphique.drawImage(this.image, 0, 0, this.image.width, this.image.height, this.x-this.cote/2, this.y-this.cote/2, this.cote, this.cote);
	}

	getPiece(){	//Nombre de piece d'or rapporté lors de ça mort
		return 25;
	}

}

class Griffon extends Aerien{
	constructor(x,y,vie,cote,direction,vitesse){
		super(x,y,vie,cote,direction,vitesse);
		this.image.src = "image/monstre/griffonB.PNG";
		graphique.drawImage(this.image, 0, 0, this.image.width, this.image.height, this.x-this.cote/2, this.y-this.cote/2, this.cote, this.cote);
	}

	dessineMonstre(){
		this.image.src = "image/monstre/griffon"+this.direction+".PNG";
		graphique.drawImage(this.image, 0, 0, this.image.width, this.image.height, this.x-this.cote/2, this.y-this.cote/2, this.cote, this.cote);
	}

	getPiece(){
		return 20;
	}

}


class Orc extends Terrestre{
	constructor(x,y,vie,cote,direction,vitesse){
		super(x,y,vie,cote,direction,vitesse);
		this.image.src = "image/monstre/orcB.PNG";
		graphique.drawImage(this.image, 0, 0, this.image.width, this.image.height, this.x-this.cote/2, this.y-this.cote/2, this.cote, this.cote);
	}

	dessineMonstre(){
		this.image.src = "image/monstre/orc"+this.direction+".PNG";
		graphique.drawImage(this.image, 0, 0, this.image.width, this.image.height, this.x-this.cote/2, this.y-this.cote/2, this.cote, this.cote);
	}

	getPiece(){
		return 10;
	}

}

class Troll extends Terrestre{
	constructor(x,y,vie,cote,direction,vitesse){
		super(x,y,vie,cote,direction,vitesse);
		this.image.src = "image/monstre/trollB.PNG";
		graphique.drawImage(this.image, 0, 0, this.image.width, this.image.height, this.x-this.cote/2, this.y-this.cote/2, this.cote, this.cote);
	}

	dessineMonstre(){
		this.image.src = "image/monstre/troll"+this.direction+".PNG";
		graphique.drawImage(this.image, 0, 0, this.image.width, this.image.height, this.x-this.cote/2, this.y-this.cote/2, this.cote, this.cote);
	}

	getPiece(){
		return 6;
	}

}


class Goule extends Terrestre{
	constructor(x,y,vie,cote,direction,vitesse){
		super(x,y,vie,cote,direction,vitesse);
		this.image.src = "image/monstre/gouleB.PNG";
		graphique.drawImage(this.image, 0, 0, this.image.width, this.image.height, this.x-this.cote/2, this.y-this.cote/2, this.cote, this.cote);
	}

	dessineMonstre(){
		this.image.src = "image/monstre/goule"+this.direction+".PNG";
		graphique.drawImage(this.image, 0, 0, this.image.width, this.image.height, this.x-this.cote/2, this.y-this.cote/2, this.cote, this.cote);
	}

	getPiece(){
		return 4;
	}

}


