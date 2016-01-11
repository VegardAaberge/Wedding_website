<?php
//error_reporting(0);
require 'connect.php';
require 'security.php';
$db->set_charset('utf8');

if(isset($_POST['data'], $_POST['names'], $_POST['type'], $_POST['id'])){
	$id = $_POST['id'];
	$type = $_POST['type'];
	$data = json_decode(stripslashes($_POST['data']));
	$names = $_POST['names'];
	
	$sql = 'UPDATE '. $type .' SET ';
	$count = 0;
	
	foreach ($names as $name){
		$sql = $sql . $name . ' = "';
		$sql = $sql . $data[$count] . '" ' ;
		if($count < count($data)-1){
				$sql = $sql . ', ';
		}
		$count = $count + 1;
	}
	$sql = $sql . 'WHERE id = "' .$id. '"';
	
	if($results = $db->query($sql)){
		echo $results;
	}
}
?>