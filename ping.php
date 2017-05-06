<?php

//Récupère la taille de la piste
if(!isset($_GET['nbLignes']) || !isset($_GET['nbColonnes'])) {
	header("HTTP/1.1 400 Bad Request");
	echo "Format de la requete incorrect.";
	echo "Il est attendu une requete de type GET avec 2 parametres:";
	echo "<ul>";
	echo "<li><b>nbLignes</b>: le nombre de lignes de la table</li>";
	echo "<li><b>nbColonnes</b>: le nombre de colonnes de la table</li>";
	echo "</ul>";
	exit();
}
$nbLignes = $_GET['nbLignes'];
$nbColonnes = $_GET['nbColonnes'];

//Tire un couple
$x = rand(0, $nbLignes-1);
$y = rand(0, $nbColonnes-1);

//Tire une couleur
$couleurs = array("red","green","black","blue","orange","white","purple","tan","magenta");
$c = $couleurs[rand(0, count($couleurs)-1)];

//On change le type de la réponse pour faire propre
header("Content-type: text/json");

//On renvoie la réponse au format JSON
echo "{\"x\": $x, \"y\" : $y, \"color\": \"$c\"}";
?>