<?php

//Récupère la taille de la piste
if(!isset($_GET['action'])) {
	header("HTTP/1.1 400 Bad Request");
	echo "Format de la requete incorrect.";
	echo "Il est attendu une requete de type GET avec 1 parametres:";
	echo "<ul>";
	echo "<li><b>la map choisie</li>";
	echo "</ul>";
	exit();
}

if($_GET['action'] == "recup"){
	// 1 : herbe
	// 2 : arbre
	// 3 : chemin
	// 4 : eau
	// 5 : constructible
	// 6 : terre
	if(!isset($_SESSION['map']) && $_GET['map'] == "vide"){
		session_start ();
		$choix = "foret";
		$_SESSION['map'] = $choix;
	}
	else if(!isset($_SESSION['map']) && $_GET['map'] != "vide"){
		session_start ();
		$choix = $_GET['map'];
		$_SESSION['map'] = $choix;
	}
	else if(isset($_SESSION['map']) && $_GET['map'] == "vide"){
		$choix = $_SESSION['map'];
	}
	else{
		$choix = $_GET['map'];
		$_SESSION['map'] = $choix;
	}

	if($choix == "foret"){
		$carte = array(
			array(1,1,1,1,1,1,3,1,1,2,2,2,1,1,1),
			array(1,1,2,1,1,5,3,3,2,5,2,2,2,1,1),
			array(1,1,2,2,2,1,1,3,3,3,3,5,2,2,1),
			array(1,2,2,4,2,2,1,2,4,1,3,3,2,2,1),
			array(4,1,2,2,3,3,3,3,5,2,1,3,5,2,1),
			array(1,1,2,4,3,1,2,3,3,3,3,3,4,2,1),
			array(1,2,2,5,3,1,2,2,1,5,5,2,2,2,1),
			array(4,2,2,2,3,3,3,3,5,2,2,2,2,2,1),
			array(1,1,2,4,1,1,2,3,3,3,1,1,4,2,1),
			array(1,2,2,5,1,1,2,5,2,3,5,2,1,1,1),
			array(1,1,2,2,1,5,3,3,3,3,5,2,1,2,1),
			array(1,1,2,2,1,3,3,2,1,5,1,2,2,2,1),
			array(1,1,1,2,3,3,5,2,1,2,2,2,2,1,1),
			array(1,1,1,5,3,1,2,2,1,2,1,1,2,1,1)
			);
	}
	else if($choix == "plaine"){
		$carte = array(
			array(1,1,1,1,1,1,3,1,1,2,2,2,1,1,1),
			array(1,1,1,1,5,3,3,1,2,1,2,1,1,1,1),
			array(1,1,3,3,3,3,1,1,1,1,1,1,2,1,1),
			array(1,2,3,5,1,2,1,2,4,1,1,1,2,1,1),
			array(4,5,3,3,1,5,1,1,5,2,1,1,5,1,1),
			array(1,1,1,3,3,3,3,3,1,2,1,1,4,1,1),
			array(1,1,1,5,5,1,2,3,3,1,3,3,3,5,1),
			array(4,1,2,2,1,1,1,1,3,3,3,1,3,3,1),
			array(1,1,1,4,1,5,2,1,5,2,4,5,4,3,1),
			array(1,1,1,1,1,1,2,2,1,5,1,1,1,3,1)
			);
	}
	else if($choix == "desert"){
		$carte = array(
			array(6,6,6,6,3,6,6,6,6,6,6,1,1,1,1),
			array(6,6,6,6,3,6,6,6,6,6,6,1,4,2,6),
			array(6,6,6,5,3,3,3,3,6,6,6,2,2,2,6),
			array(6,6,6,6,6,6,6,3,3,3,6,6,6,6,6),
			array(6,6,2,6,6,6,6,5,6,3,3,6,6,6,6),
			array(1,1,4,2,6,6,6,5,6,6,3,5,6,6,6),
			array(6,1,2,2,6,6,3,3,3,3,3,6,6,6,6),
			array(6,1,1,5,3,3,3,5,6,5,6,6,6,6,6),
			array(6,6,3,3,3,6,5,6,6,6,6,6,6,6,6),
			array(6,6,3,6,6,6,6,6,6,6,6,6,6,6,6)
		);

	}


	$largeur = count($carte[0]);
	$hauteur = count($carte);

	$carteJson = array();

	for($y=0; $y<$hauteur ; ++$y)
	{

		$carteJson[$y] = "[";
		for($x=0; $x<$largeur ; ++$x){
			if($x != 0){
				$carteJson[$y] .= ",";
			}
			$carteJson[$y] .= "{\"x\": $x, \"y\" : $y, \"typeCase\": ".$carte[$y][$x]."}";
		}
		$carteJson[$y] .= "]";
	}

	//header("Content-type: text/json");
	header("Content-type: text/json");
	echo "{\"largeur\" : $largeur , \"hauteur\" : $hauteur, ";
	echo "\"carte\" : [";
	for($i=0; $i<$hauteur; ++$i)
	{
		if($i!=0)
			echo ",";
		echo $carteJson[$i];
	}

	echo "]}";
	echo "";

	//On renvoie la réponse au format JSON
	//echo "{\"x\": $x, \"y\" : $y, \"color\": \"$c\"}";
}

?>