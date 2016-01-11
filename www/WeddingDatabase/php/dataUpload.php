<?php
error_reporting(0);
require 'connect.php';
require 'security.php';
$db->set_charset('utf8');

if(isset($_POST['data'], $_POST['type'])){
	// Getting the data
	$type = $_POST['type'];
	$data = json_decode(stripslashes($_POST['data']));
	
	// Creating first part of the string
	$sql = 'INSERT INTO ' . $type . ' (';
	for ($i=0; $i < count($data) ; $i++) { 
		$sql = $sql . $data[$i]->name . ',';
	}
	if($type == 'people'){
		$sql = $sql . 'created';
	}else{
		$sql = rtrim($sql, ",");
	}
	
	// Creating the last part of the string
	$sql = $sql . ') VALUES (';
	for ($i=0; $i < count($data) ; $i++) { 
		$sql = $sql .'"' . $data[$i]->value . '",';
	}
	if($type == 'people'){
		$sql = $sql . 'NOW())';
	}else{
		$sql = rtrim($sql, ",");
		$sql = $sql . ')';
	}
	// Executing the statement
	if($results = $db->query($sql)){
		echo $results;
	}
}

?>