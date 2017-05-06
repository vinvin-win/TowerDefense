<?php

/**
* Génère une liste des héros.
* Cette liste est stockée dans la variable de session $_SESSION["top"];
*/
function initHeros() {
	$_SESSION["top"] = array("Superman","Spiderman","Batman",
				 "Spawn","Hulk","Chuck Norris",
				 "Wolverine","Aquaman","Captain America",
				 "Hawkeye","Iron Man","Flash",
				 "Green Lantern","Daredevil","Hellboy",
				 "Ghost Rider","Wonder Woman","Thor",
				 "Cyclop","Storm","Luke Skywalker",
				 "Neo","The Green Hornet","Professor X",
	);
}

/**
* Fait monter le héros à la place $p d'une place dans le classement
* @param $p la place du héro
* @return {@code true} si c'est un succes.
*/
function inc($p) {
	$top = $_SESSION["top"];
	if ($p != 0) {
		swap($p-1, $p);
		return true;
	}
	return false;
}

/**
* Fait descendre le héros à la plce $p d'une place dans le classement
* @param $p la place du héro
* @return {@code true} si c'est un succes.
*/
function dec($p) {
	$top = $_SESSION["top"];
	if ($p != count($top) - 1) {
		swap($p, $p+1);
		return true;
	}
	return false;
}

/**
 * Echange de position 2 héros
 * @param $x la place du premier héro.
 * @param $y la place du second héro.
 */
function swap($x, $y) {		
	var_dump($_SESSION["top"]);
	$o = $_SESSION["top"][$x];
	$_SESSION["top"][$x] = $_SESSION["top"][$y];
	$_SESSION["top"][$y] = $o;
	var_dump($_SESSION["top"]);
}

/**
* affichage HTML des héros.
*/
function html_heroes() {
	$top = $_SESSION["top"];
	echo "<h2>Heroes top <span id='nb'>".count($top)."</span></h2>";
	echo "<table>";	
	echo "<thead>";
	echo "<tr>";
		echo "<th>Nom</th><th>Classement</th>";
	echo "</tr>";
	echo "</thead>";
	echo "<tbody>";	
	for ($i = 0; $i < count($top); $i++) {
		echo "<tr id='pos-$i'>";
		echo "<td>".$top[$i]."</td>";
		echo "<td>";
		echo "<a href='#' onclick='change(\"inc\", $i)'><img src='img/up.png' alt='up'></a>";
		echo "<a href='#' onclick='change(\"dec\", $i)'><img src='img/down.png' alt='up'></a>";
		echo "</tr>";
	}
	echo "</tbody>";
	echo "</table>";
}
?>