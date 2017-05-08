
export class Case {
	constructor(x,y,cote){
		this.cote = cote;
		this.x = x;
		this.y = y;
		this.image = new Image();
		this.image.src = "image/texture/terre1.JPG";
		this.coeffDep = 10;
		this.coteDec = this.cote+this.cote/this.coeffDep;
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


export class CaseEau extends Case{
	
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


export class CaseArbre extends Case{
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

export class CaseHerbe extends Case{

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

export class CaseConstructible extends Case{
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

export class CaseChemin extends Case{
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


export class CaseToure extends Case{
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

//export { Case, CaseEau, CaseArbre, CaseHerbe };