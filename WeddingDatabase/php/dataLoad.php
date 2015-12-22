<?php
//error_reporting(0);
require 'connect.php';
require 'security.php';
$db->set_charset('utf8');

if(isset($_POST['dress'], $_POST['type'])){
	if($_POST['type'] == 3){
		$sql = "SELECT id, accessory_code FROM accessories";
	}else{
		$sql = "SELECT id, dress_code FROM dresses";
	}
	
	$results = $db->query($sql);
	$dress = $_POST['dress'];
	
	if($results->num_rows){
		while($row = $results->fetch_object()){
			$id[] = $row->id;

			if($_POST['type'] == 1){
				$rows[] = $row->dress_code;
				if($dress == $row->dress_code){
					$index = $row->id;
				}
			}else if($_POST['type'] == 2){
				$rows[] = $row->dress_code;
				$index = new SplFixedArray(3);
				for ($i = 0; $i <= 2; $i++){
					if($dress[$i] == $row->dress_code){
						$index[$i] = $row->id;
					}
				}
			}else if($_POST['type'] == 3){
				$rows[] = $row->accessory_code;
				if($dress == $row->accessory_code){
					$index = $row->id;
				}
			}

		}
		$Records = array($id, $rows, $index);
		echo json_encode($Records, 128); 
	}
}else{
	
	// Dresses
	$sql = "SELECT id, dress_code FROM dresses";
	$results = $db->query($sql);
	if($results->num_rows){
		while($row = $results->fetch_object()){
			$rows[0] = $row->id;
			$rows[1] = $row->dress_code;
			$dresses[] = $rows;
		}
		unset($rows);
	}

	// Accessory
	$sql = "SELECT id, accessory_code FROM accessories";
	$results = $db->query($sql);
	if($results->num_rows){
		while($row = $results->fetch_object()){
			$rows[0] = $row->id;
			$rows[1] = $row->accessory_code;
			$accessory[] = $rows;
		}
	}


	$data = array($dresses, $accessory);
	echo json_encode($data, 128); 
	
}

?>