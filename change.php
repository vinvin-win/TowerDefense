<?php
/**
* Script communiquant avec le client.
*/
session_start();
require_once("inc/heroes.inc");

/**
* Indique au client une message requete.
*/
function reportBadRequest() {
	header("HTTP/1.1 400 Bad Request");
	echo "Format de la requete incorrect.";
	echo "Il est attendu une requete de type POST avec 2 parametres:";
	echo "<ul>";
	echo "<li><b>op</b>: l'operation a executer ('inc', 'dec')</li>";
	echo "<li><b>pos</b>: la position du hero dans la liste</li>";
	echo "</ul>";
	echo "<br/>";
	echo "La requete aura ete executee avec succes lorsque la page retournera un code 200";
	echo "<br/>Parametres POST recu: ";
	var_dump($_POST);
	echo "<br/>Parametres GET recu: ";
	var_dump($_GET);
	exit();
}
if (!isset($_POST["op"]) || !isset($_POST["pos"])) {
	reportBadRequest();
}

/**
* On récupère l'opération à exécuter et on le fait.
*/
$op = $_POST["op"];
$pos = $_POST["pos"];
switch($op) {
	case "inc": swap($pos,$pos-1); break;
	case "dec": swap($pos,$pos+1); break;	
	default: reportBadRequest();
}
?>