<?php 
function esc($string){
	return htmlentities(trim($string), ENT_QUOTES, 'UTF-8');
}
?>