//import { Case, CaseEau, CaseArbre, CaseHerbe } from 'case.js';
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
			var css = document.getElementById("matrice");
			css.width = this.cote*this.nbColonnes;
			css.height = this.cote*this.nbLignes;

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

		    this.cote = Math.trunc(canvas.width/this.nbColonnes);
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

	setCarte(X, Y, case1){
		this.carte[X][Y] = case1;
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
					break;

					case 2:
					this.carte[x][y] = new CaseEau(x,y,this.cote);
					break;

					case 3:
					this.carte[x][y] = new CaseHerbe(x,y,this.cote);
					break;

					case 4:
					this.carte[x][y] = new CaseConstructible(x,y,this.cote);
					break;

					case 5:
					this.carte[x][y] = new CaseChemin(x,y,this.cote);
					break;

					default:
					this.carte[x][y] = new Case(x,y,this.cote);
					break;
				}
				
			}
		}
	}

}

window.onload = function(){
	var mat = new Matrice(10,15,30);
	canvas.addEventListener("mousedown", zoneClique, false);
	//mat.ajoutMatrice();
	mat.recupereCarte();
	//var myInterval = setInterval(animate, 30);

	function animate()
    {
    	//var mat = new Matrice(10,15,30);
    	//graphique.clearRect(0, 0, canvas.width, canvas.height);
    	graphique.beginPath();
    	//mat.setCarte(1, 1, new CaseHerbe(1,1,30));
    	mat.recupereCarte();
    }


    function zoneClique(event){
		var x = event.x;
	  	var y = event.y;

	  	x -= canvas.offsetLeft;
	  	y -= canvas.offsetTop;
	  	x/=mat.getCote();
	  	y/=mat.getCote();
	  	x = Math.trunc(x);
	  	y = Math.trunc(y);
	  	//alert("x:" +  x + " y:" + y);
	  	//mat.recupereCarte();
	  	//changeCase(x,y);

	  	//x = Math.trunc(x/this.cote);
	  	//y = y/this.cote;
	  	mat.setCarte(x,y, new CaseHerbe(x,y,mat.getCote()));
	  	
	}

}

    
    function changeCase(x ,y){

	  	//x = x/this.cote;
	  	//y = y/this.cote;
	  	//this.carte[x][y] = new CaseHerbe(x,y,this.cote);
	  	//var mat = new Matrice(10,15,30);
	  	//mat.recupereCarte();
	  	//mat.setCarte(x,y, new CaseHerbe(x,y,30));
	  	//alert("x:" + mat.getCote() + " y:" + 7);
	}





class Case {
	constructor(x,y,cote){
		this.cote = cote;
		this.x = x;
		this.y = y;
		this.image = new Image();
		this.image.src = "image/texture/terre1.JPG";
		this.coteDec = this.cote+this.cote/6
		graphique.drawImage(this.image, 1, 1, this.image.width, this.image.height, this.x*this.cote-this.cote/12, this.y*this.cote-this.cote/12, this.coteDec, this.coteDec);
	}

	dessinCase(){
		graphique.drawImage(this.image, 1, 1, this.image.width, this.image.height, this.x*this.cote-this.cote/12, this.y*this.cote-this.cote/12, this.coteDec, this.coteDec);
	}


	//var id = ""+ x+','+ y ;
	//var a = document.getElementById(id);
	//a.innerHTML="<img src='image/case.png'>" ;
}


class CaseEau extends Case{
	
	constructor(x,y,cote){
		Case.call(x, y, cote);
		this.image = new Image();
		this.image.src = "image/texture/eau.gif";
		coteDec = this.cote+this.cote/6
		graphique.drawImage(this.image, 1, 1, this.image.width, this.image.height, this.x*this.cote-this.cote/12, this.y*this.cote-this.cote/12, coteDec, coteDec);
	}

		dessinCase(){
		coteDec = this.cote+this.cote/6
		graphique.drawImage(this.image, 1, 1, this.image.width, this.image.height, this.x*this.cote-this.cote/12, this.y*this.cote-this.cote/12, coteDec, coteDec);
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
	
	//graphique.drawImage(image, 0, 0, image.width, image.height, this.x*cote-cote/12, this.y*cote-cote/12, cote+cote/6, cote+cote/6);

/*
	var id = ""+ x+','+ y ;
	var a = document.getElementById(id);
	a.innerHTML="<img src='image/eau.png'>" ;*/
}


function CaseArbre(x,y,cote){
	this.cote = cote;
	this.x = x;
	this.y = y;
	Case.call(this, x, y, cote);

	var image = new Image();
	image.src = "image/texture/arbre1.png";
	graphique.drawImage(image, 0, 0, image.width, image.height, this.x*cote-cote/12, this.y*cote-cote/12, cote+cote/6, cote+cote/6);
/*
	var id = ""+ x+','+ y ;
	var a = document.getElementById(id);
	a.innerHTML="<img src='image/arbre.jpeg'>";*/
}

function CaseHerbe(x,y,cote){
	this.cote = cote;
	this.x = x;
	this.y = y;
	Case.call(this, x, y, cote);

	var image = new Image();
	image.src = "image/texture/herbe.png";
	graphique.drawImage(image, 0, 0, image.width, image.height, this.x*cote-cote/12, this.y*cote-cote/12, cote+cote/6, cote+cote/6);

/*
	var id = ""+ x+','+ y ;
	var a = document.getElementById(id);
	a.innerHTML="<img src='image/herbe.jpeg'>" ;*/
	} 

function CaseConstructible(x,y,cote){
	this.cote = cote;
	this.x = x;
	this.y = y;
	Case.call(this, x, y, cote);

	var image = new Image();
	image.src = "image/texture/baseToure.png";
	graphique.drawImage(image, 0, 0, image.width, image.height, this.x*cote-cote/12, this.y*cote-cote/12, cote+cote/6, cote+cote/6);

/*
	var id = ""+ x+','+ y ;
	var a = document.getElementById(id);
	a.innerHTML="<img src='image/herbe.jpeg'>" ;*/
	}

	function CaseChemin(x,y,cote){
	this.cote = cote;
	this.x = x;
	this.y = y;
	Case.call(this, x, y, cote);

	var image = new Image();
	image.src = "image/texture/chemin.png";
	graphique.drawImage(image, 0, 0, image.width, image.height, this.x*cote-cote/12, this.y*cote-cote/12, cote+cote/6, cote+cote/6);

	}




function draw_anim(context, x, y, iobj) { // context is the canvas 2d context.
    if (iobj.source != null)
    	alert(iobj.current)
        context.drawImage(iobj.source, iobj.current * iobj.width, 0,iobj.width, iobj.height,x, y, iobj.width, iobj.height);
    iobj.current = (iobj.current + 1) % iobj.total_frames;

                   // incrementing the current frame and assuring animation loop
}


CaseEau.prototype = Object.create(Case.prototype);
CaseArbre.prototype = Object.create(Case.prototype);
CaseHerbe.prototype = Object.create(Case.prototype);