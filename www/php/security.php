<?php 
function esc($db, $string){
	$string = mysqli_real_escape_string($db, $string);
	return $string;
}
?>