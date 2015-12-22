<?php
error_reporting(0);
require 'connect.php';
require 'security.php';
$db->set_charset('utf8');


if(isset($_POST['id'], $_POST['type'])){

	$id = trim($_POST['id']);
	$type = $_POST['type'];
	if($result = $db->query('SELECT `id` FROM `'. $type .'`')){
		if($result->num_rows){	
					
			while($row = $result->fetch_object()){
				if($row->id == $id){
					$sql = 'DELETE FROM '. $type .' WHERE id=' . $row->id;
					
					if (mysqli_query($db, $sql)) {
						echo 'deleted';
					}
				}	
			}
		}
	}	
}
		
?>