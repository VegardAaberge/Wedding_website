<?php
//error_reporting(0);
require 'connect.php';
require 'security.php';
$db->set_charset('utf8');


$records = array();
$rows = array();
if(isset($_POST['type'])){
	$type = $_POST['type'];
	if(isset($_POST['order_name'])){
		$order_name = $_POST['order_name'];
	}
	if($type == 'people'){
		$sql = "
		SELECT people.id, people.first_name, people.last_name, people.created, people.information,
		ed1.dress_code AS 'dresses1',
		ed2.dress_code AS 'dresses2',  
		ed3.dress_code AS 'dresses3' 
		FROM people 
		LEFT JOIN dresses ed1 ON people.wedding_dress1=ed1.ID 
		LEFT JOIN dresses ed2 ON people.wedding_dress2=ed2.ID 
		LEFT JOIN dresses ed3 ON people.wedding_dress3=ed3.ID 
		ORDER BY people.". $order_name ." DESC";
	}
	if($type == 'orders'){
		$sql = "
		SELECT orders.id, orders.name, orders.order_number, orders.dress, orders.tracking, 
		orders.import_price, orders.sale_price, orders.order_date, orders.due_date, orders.arrival_date,
		
		dresses.dress_code AS dresses FROM orders
		LEFT JOIN dresses ON orders.dress = dresses.id 
		ORDER BY orders.". $order_name ." DESC";
	}
	if($type == 'ordersacc'){
				$sql = "
		SELECT ordersacc.id, ordersacc.name, ordersacc.accessory, ordersacc.import_price, ordersacc.sale_price, ordersacc.order_date,
		accessories.accessory_code AS accessory_code FROM ordersacc
		LEFT JOIN accessories ON ordersacc.accessory = accessories.id 
		ORDER BY ordersacc.". $order_name ." DESC";
	}
	if($type == 'dresses'){
		$sql = "SELECT id, name, dress_code, purchase_price, sale_price FROM dresses ORDER BY dresses.". $order_name ." DESC";
	}
	if($type == 'accessories'){
		$sql = "SELECT id, name, accessory_code, sale_price, purchase_price, stock FROM accessories ORDER BY accessories.". $order_name ." DESC";
	}
	if($type == 'bookings'){
		$sql = "SELECT id, name, phone_number, email, information, booking_time, wedding_date FROM bookings ORDER BY bookings.". $order_name ." DESC";
	}
}
	
$results = $db->query($sql);
$subst = 'null';
$name = 'null';	
if($results->num_rows){
	while($row = $results->fetch_object()){		
		if(isset($_POST['search_name'])){
			$name = $_POST['search_name'];
			if($type == 'people'){
				$subst = substr($row->first_name, 0, strlen($name));
			}
			if($type == 'orders'){
				$subst = substr($row->name, 0, strlen($name));
			}
			if($type == 'ordersacc'){
				$subst = substr($row->name, 0, strlen($name));
			}
			if($type == 'dresses'){
				if($_POST['searchOption'] == 'name'){$subst = substr($row->name, 0, strlen($name));}
				if($_POST['searchOption'] == 'dress_code'){$subst = substr($row->dress_code, 0, strlen($name));}
			}
			if($type == 'accessories'){
				if($_POST['searchOption'] == 'name'){$subst = substr($row->name, 0, strlen($name));}
				if($_POST['searchOption'] == 'accessory_code'){$subst = substr($row->accessory_code, 0, strlen($name));}
			}
			if($type == 'bookings'){
				$subst = substr($row->name, 0, strlen($name));
			}
		}
				
		/* Getting the records */
		if($name == strtolower($subst)){
			if($type == 'people'){
				$rows[0] = $row->id;
				$rows[1] = $row->first_name;
				$rows[2] = $row->last_name;
				$rows[3] = $row->dresses1;
				$rows[4] = $row->dresses2;
				$rows[5] = $row->dresses3;
				$rows[6] = $row->information;
				$rows[7] = $row->created;
				$records[] = $rows;
			}else if($type == 'orders'){
				$rows[0] = $row->id;
				$rows[1] = $row->name;
				$rows[2] = $row->order_number;
				$rows[3] = $row->dresses;
				$rows[4] = $row->import_price;
				$rows[5] = $row->sale_price;
				$rows[6] = $row->tracking;
				$rows[7] = $row->order_date;
				$rows[8] = $row->due_date;
				$rows[9] = $row->arrival_date;
				$records[] = $rows;
			}else if($type == 'ordersacc'){
				$rows[0] = $row->id;
				$rows[1] = $row->name;
				$rows[2] = $row->accessory_code;
				$rows[3] = $row->import_price;
				$rows[4] = $row->sale_price;
				$rows[5] = $row->order_date;
				$records[] = $rows;
			}else if($type == 'dresses'){
				$rows[0] = $row->id;
				$rows[1] = $row->name;
				$rows[2] = $row->dress_code;
				$rows[3] = $row->purchase_price;
				$rows[4] = $row->sale_price;
				$records[] = $rows;
			}else if($type == 'accessories'){
				$rows[0] = $row->id;
				$rows[1] = $row->name;
				$rows[2] = $row->accessory_code;
				$rows[3] = $row->sale_price;
				$rows[4] = $row->purchase_price;
				$rows[5] = $row->stock;
				$records[] = $rows;
			}else if($type == 'bookings'){
				$rows[0] = $row->id;
				$rows[1] = $row->name;
				$rows[2] = $row->phone_number;
				$rows[3] = $row->email;
				$rows[4] = $row->information;
				$rows[5] = $row->wedding_date;
				$rows[6] = $row->booking_time;
				$records[] = $rows;
			}
		}
	}
}

echo json_encode($records, 128);

?>