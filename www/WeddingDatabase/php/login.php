<?php
	if(isset($_POST['username'], $_POST['password'])){
		$username = $_POST['username'];
		$password = $_POST['password'];

		$db = new mysqli('127.0.0.1', $username, $password, 'aabergeb_brudekjole');
		
		if($db->connect_errno){
			echo $db->connect_error;
		}else{
			echo 'success';
		}
	}
?>