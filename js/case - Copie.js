
    


function Case(x,y,cote) {
	this.cote = cote;
	this.x = x;
	this.y = y;
	var image = new Image();
	image.src = "image/texture/terre1.JPG";
	graphique.drawImage(image, 1, 1, image.width, image.height, this.x*this.cote, this.y*this.cote, this.cote, this.cote);

	//var id = ""+ x+','+ y ;
	//var a = document.getElementById(id);
	//a.innerHTML="<img src='image/case.png'>" ;
}


function CaseEau(x,y,cote){
	this.cote = cote;
	this.x = x;
	this.y = y;
	Case.call(this, x, y, cote);
	var image = new Image();
	image.src = "image/texture/eau.gif";
	graphique.drawImage(image, 0, 0, image.width, image.height, this.x*cote, this.y*cote, cote, cote);

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
	graphique.drawImage(image, 0, 0, image.width, image.height, this.x*cote, this.y*cote, cote, cote);
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
	graphique.drawImage(image, 0, 0, image.width, image.height, this.x*cote, this.y*cote, cote, cote);

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
	graphique.drawImage(image, 0, 0, image.width, image.height, this.x*cote, this.y*cote, cote, cote);

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
	graphique.drawImage(image, 0, 0, image.width, image.height, this.x*cote, this.y*cote, cote, cote);

/*
	var id = ""+ x+','+ y ;
	var a = document.getElementById(id);
	a.innerHTML="<img src='image/herbe.jpeg'>" ;*/
	} 


CaseEau.prototype = Object.create(Case.prototype);
CaseArbre.prototype = Object.create(Case.prototype);
CaseHerbe.prototype = Object.create(Case.prototype);

//export { Case, CaseEau, CaseArbre, CaseHerbe };