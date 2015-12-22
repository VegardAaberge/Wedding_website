<?php
	if(isset($_POST['userdata'])){
		$username = $_POST['userdata'][0];
		$password = $_POST['userdata'][1];
	}

	$db = new mysqli('127.0.0.1', $username,$password, 'aabergeb_brudekjole');
	
	if($db->connect_errno){
		echo $db->connect_error;
		die('<br> Sorry, we are having some problems.');
	}
?>