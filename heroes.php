<?php
session_start();
require_once("inc/heroes.inc");
?>
<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE html PUBLIC
  "-//W3C//DTD XHTML 1.0 Strict//EN"
  "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="fr" lang="fr">
  <head>
    <title>Top of the heroes</title>
    <link type="text/css" rel="stylesheet" href="css/style.css" media="screen"/>
    <script src="js/top.js"></script>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
  </head>
<body>
<?php
//On initialise la liste des héros si c'est un premier appel
//on pourra forcer la reinitialisation avec un appel avec ?wipe=true en parametre
if (!isset($_SESSION["top"]) || isset($_GET["wipe"])) {
	initHeros();
}
//On affiche le tableau des héros
html_heroes();
?>
</body>
</html>