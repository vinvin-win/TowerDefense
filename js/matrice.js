//import {Case, CaseHerbe, CaseChemin, CaseEau, CaseArbre, CaseConstructible, CaseToure} from "case";
//import * from "js/case.js";

//requirejs("js/case.js")


	/*var nbColonnes;
	var nbLignes;
	var cote;
	var carte;*/

	var canvas;
	var graphique;


//var Matrice = Class.create();

class Matrice {


		constructor(largeur, hauteur, nbPixel){
			this.nbColonnes = largeur;
			this.nbLignes = hauteur;
			this.cote = nbPixel;

			this.carte = new Array();
			for(var x = 0; x<this.nbColonnes; x++){
				this.carte[x] = new Array();
			}

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
		    //this.cote = Math.trunc(canvas.width/this.nbColonnes);
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
	}

	getCase(X, Y){
		return this.carte[X][Y];
	}


	ajoutMatrice() {

		//Crée un tableua qui sera la map
		var table = "<table>";
		for (var x = 0; x < this.nbColonnes; x++) {
			table += "<tr>";
			for (var y = 0; y < this.nbLignes; y++) {			
				table += "<td id='" + x + "," + y + "' class='cell'></td>" 

			}
			table += "</tr>";
		}
		table += "</table>";

		var doc = document.getElementById("matrice");
		doc.innerHTML = table;

	}

	recupereCarte() {
		for(var x = 0; x<this.nbColonnes; x++){
			for(var y = 0; y<this.nbLignes; y++){
				var valAl = Math.random()*10;
				valAl = Math.trunc(valAl);
				switch(valAl){
					case 1:
					this.carte[x][y] = new CaseArbre(x,y,this.cote);
					this.carte[x][y].dessinCase();
					break;

					case 2:
					this.carte[x][y] = new CaseEau(x,y,this.cote);
					this.carte[x][y].dessinCase();
					break;

					case 3:
					this.carte[x][y] = new CaseHerbe(x,y,this.cote);
					this.carte[x][y].dessinCase();
					break;

					case 4:
					this.carte[x][y] = new CaseConstructible(x,y,this.cote);
					this.carte[x][y].dessinCase();
					break;

					case 5:
					this.carte[x][y] = new Case(x,y,this.cote);
					this.carte[x][y].dessinCase();
					this.carte[x][y] = new CaseChemin(x,y,this.cote);
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

}

window.onload = function(){
	var mat = new Matrice(20,30,80);
	canvas.addEventListener("mousedown", zoneClique, false);
	//mat.ajoutMatrice();  <img src="image/fontMenuPrincipale.jpg"></img>
	mat.recupereCarte();
	//var myInterval = setInterval(animate, 30);
	vague(3);


	var son = document.getElementById("musique");

	//son.innerHTML = "<embed src='musique/Lich King Theme.mp3' hidden=true autostart=true loop=true name='MonSon' mastersound>";
	//alert(son.innerHTML);



	function animate()
    {
    	//var mat = new Matrice(10,15,30);
    	//graphique.clearRect(0, 0, canvas.width, canvas.height);
    	graphique.beginPath();
    	//mat.setCarte(1, 1, new CaseHerbe(1,1,30));
    	mat.recupereCarte();
    }


    function getDecallageElment(element) {
    var cx = 0;
    var cy = 0;
 
    while(element && !isNaN(element.offsetLeft) && !isNaN(element.offsetTop)) {
        cx += element.offsetLeft - element.scrollLeft;
        cy += element.offsetTop - element.scrollTop;
        element = element.offsetParent;  //On récupère les offset de tout les conteneur parent de l'element
    }
    return { haut: cy, gauche: cx };
}

    function zoneClique(event){
		var x = event.x;
	  	var y = event.y;

	  	//x -= canvas.offsetLeft;
	  	//y -= canvas.offsetTop;

	  	x = event.pageX - window.pageXOffset- getDecallageElment(canvas).gauche;
        y = event.pageY - window.pageYOffset - getDecallageElment(canvas).haut;

	  	//new Dragon(x,y,50,mat.getCote(),"B");
	  	//alert("x:" + x + " y:" + y);
	  	x/=mat.getCote();
	  	y/=mat.getCote();
	  	x = Math.trunc(x);
	  	y = Math.trunc(y);
	  	
	  	//mat.recupereCarte();
	  	//changeCase(x,y);

	  	//x = Math.trunc(x/this.cote);
	  	//y = y/this.cote;
	  	//alert(mat.getCase(x,y).estConstructible());
	  	
	  	mat.setCase(x,y, new CaseArbre(x,y,mat.getCote(), 1, 1, 200, 3));
	  	mat.getCase(x,y).dessinCase();
	  	//alert(mat.getCase(x,y).estConstructible());
	  	
	}

}


class Case {
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


	//var id = ""+ x+','+ y ;
	//var a = document.getElementById(id);
	//a.innerHTML="<img src='image/case.png'>" ;
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

	/*var image_obj = {
    'source': null,
    'current': 0,
    'total_frames': 4,
    'width': 16,
    'height': 16
	};
	img.onload = function () { // Triggered when image has finished loading.
    	image_obj.source = img;  // we set the image source for our object.
	}

	img.src = "image/texture/eau3.png";

	image_obj.width = img.width/4;
	image_obj.height = img.height;
	image_obj.source = img;

	setInterval((function (c, i) {
                return function () {
                    draw_anim(c, 10, 10, i);
                };
    })(graphique, image_obj), 1000);*/
	
	//graphique.drawImage(image, 0, 0, image.width, image.height, this.x*cote-cote/this.coeffDep, this.y*cote-cote/this.coeffDep, cote+cote/6, cote+cote/6);

/*
	var id = ""+ x+','+ y ;
	var a = document.getElementById(id);
	a.innerHTML="<img src='image/eau.png'>" ;*/
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

/*
	var id = ""+ x+','+ y ;
	var a = document.getElementById(id);
	a.innerHTML="<img src='image/arbre.jpeg'>";*/
}

class CaseHerbe extends Case{

	constructor(x,y,cote){
		super(x, y, cote);
		this.image = new Image();
		this.image.src = "image/texture/herbe.png";
		this.coteDec = this.cote+this.cote/this.coeffDep
		//graphique.drawImage(this.image, 1, 1, this.image.width, this.image.height, this.x*this.cote-this.cote/this.coeffDep, this.y*this.cote-this.cote/this.coeffDep, this.coteDec, this.coteDec);
	}

	dessinCase(){
		graphique.drawImage(this.image, 1, 1, this.image.width, this.image.height, this.x*this.cote-this.cote/(this.coeffDep*2), this.y*this.cote-this.cote/(this.coeffDep*2), this.coteDec, this.coteDec);
	}



/*
	var id = ""+ x+','+ y ;
	var a = document.getElementById(id);
	a.innerHTML="<img src='image/herbe.jpeg'>" ;*/
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

/*
	var id = ""+ x+','+ y ;
	var a = document.getElementById(id);
	a.innerHTML="<img src='image/herbe.jpeg'>" ;*/
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
		this.image = new Image();
		this.image.src = "image/toure/toure1.PNG";
		this.coteDec = this.cote+this.cote/this.coeffDep
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
		this.zoneAtt = z;
	}

	setFrequenceTir(f){
		this.freqTir = f;
	}

	dessinCase(){
		if(this.pAttT >= 10 || this.pAttAe >= 10){
			this.image.src = "image/toure/toure4.PNG";
		}
		else if(this.zoneAtt >= 10){
			this.image.src = "image/toure/toure2.PNG";
		}
		else if(this.freqTir >= 5){
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

	attaque(monstre){
		distance = Math.pow(monstre.getPostition()[0],2)+Math.pow(monstre.getPostition()[1],2);
		distance = Math.sqrt(distance);
		if(distance <= zoneAct){
			if(monstre.estVolante()){
				monstre.setVie(this.pAttAe*Math.random());
			}
			else{
				monstre.setVie(this.pAttT*Math.random());
			}
			
		}

	}

}







class Unite {
	constructor(x,y,vie,cote,direction){
		this.cote = cote;
		this.x = x;
		this.y = y;
		this.vie = vie;
		this.direction = direction;
		this.image = new Image();
	}

	setPosition(X,Y){
		this.x = X;
		this.y = Y;
	}

	getPostition(){
		return [this.x, this.y];
	}

	setVie(v){
		this.vie = v;
	}

	getVie(){
		return this.vie;
	}

	setDirection(dire){
		this.direction = dire;
	}

	getDirection(){
		return this.direction;
	}

	estVolante(){
		return false;
	}

}

class Aerien extends Unite{
	constructor(x,y,vie,cote,direction){
		super(x,y,cote,direction);
		graphique.drawImage(this.image, 0, 0, this.image.width, this.image.height, this.x, this.y, this.cote, this.cote);
	}

	estVolante(){
		return true;
	}

}

class Terrestre extends Unite{
		constructor(x,y,vie,cote,direction){
		super(x,y,vie,cote,direction);
		graphique.drawImage(this.image, 0, 0, this.image.width, this.image.height, this.x, this.y, this.cote, this.cote);
	}

}

class Dragon extends Aerien{
	constructor(x,y,vie,cote,direction){
		super(x,y,vie,cote,direction);
		this.image.src = "image/monstre/dragon"+direction+".PNG";
		graphique.drawImage(this.image, 0, 0, this.image.width, this.image.height, this.x, this.y, this.cote, this.cote);
		//alert(this.image.src)
	}

	dessinMonstre(){
		this.image.src = "image/monstre/dragon"+this.direction+".PNG";
		graphique.drawImage(this.image, 0, 0, this.image.width, this.image.height, this.x, this.y, this.cote, this.cote);
	}

}

class Griffon extends Aerien{
	constructor(x,y,vie,cote,direction){
		super(x,y,vie,cote,direction);
		this.image.src = "image/monstre/griffon"+direction+".PNG";
		graphique.drawImage(this.image, 0, 0, this.image.width, this.image.height, this.x, this.y, this.cote, this.cote);
		//alert(this.image.src)
	}

	dessinMonstre(){
		this.image.src = "image/monstre/griffon"+this.direction+".PNG";
		graphique.drawImage(this.image, 0, 0, this.image.width, this.image.height, this.x, this.y, this.cote, this.cote);
	}

}


class Orc extends Terrestre{
	constructor(x,y,vie,cote,direction){
		super(x,y,vie,cote,direction);
		this.image.src = "image/monstre/orcB.PNG";
		graphique.drawImage(this.image, 0, 0, this.image.width, this.image.height, this.x, this.y, this.cote, this.cote);
	}

	dessinMonstre(){
		this.image.src = "image/monstre/orc"+this.direction+".PNG";
		graphique.drawImage(this.image, 0, 0, this.image.width, this.image.height, this.x, this.y, this.cote, this.cote);
	}

}

class Troll extends Terrestre{
	constructor(x,y,vie,cote,direction){
		super(x,y,vie,cote,direction);
		this.image.src = "image/monstre/trollB.PNG";
		graphique.drawImage(this.image, 0, 0, this.image.width, this.image.height, this.x, this.y, this.cote, this.cote);
	}

	dessinMonstre(){
		this.image.src = "image/monstre/troll"+this.direction+".PNG";
		graphique.drawImage(this.image, 0, 0, this.image.width, this.image.height, this.x, this.y, this.cote, this.cote);
	}

}


class Goule extends Terrestre{
	constructor(x,y,vie,cote,direction){
		super(x,y,vie,cote,direction);
		this.image.src = "image/monstre/gouleB.PNG";
		graphique.drawImage(this.image, 0, 0, this.image.width, this.image.height, this.x, this.y, this.cote, this.cote);
	}

	dessinMonstre(){
		this.image.src = "image/monstre/goule"+this.direction+".PNG";
		graphique.drawImage(this.image, 0, 0, this.image.width, this.image.height, this.x, this.y, this.cote, this.cote);
	}

}



function vague(num_vague){

	var nb_monstre = num_vague*20;
	var monstre = new Array();

	if (num_vague%3==0){
		monstre.push(new Dragon(3,3,70,70,"B"));
		nb_monstre-=1;
	}

	var x = Math.random()*(nb_monstre/3);
	//alert(nb_monstre/3);
	x = Math.trunc(x);
	//alert(x)
	for (var i=1;i<x;i++){
		monstre.push(new Orc(1,1,70,70,"B"));
		monstre.push(new Goule(Math.random()*10,5,70,70,"B"));
	}
	nb_monstre -= 2*x; 

	for (var b=1;b<nb_monstre;b++){
		monstre.push(new Troll(2,2,70,70,"B"));

	}
	//alert(monstre)
}


function draw_anim(context, x, y, iobj) { // context is the canvas 2d context.
    if (iobj.source != null)
    	alert(iobj.current)
        context.drawImage(iobj.source, iobj.current * iobj.width, 0,iobj.width, iobj.height,x, y, iobj.width, iobj.height);
    iobj.current = (iobj.current + 1) % iobj.total_frames;

                   // incrementing the current frame and assuring animation loop
}