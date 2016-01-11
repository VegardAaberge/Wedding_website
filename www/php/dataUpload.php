<?php
error_reporting(0);
mysql_set_charset('utf8');
require 'connect.php';
require 'security.php';
$db->set_charset('utf8');

/* Bookings */
if(isset($_POST['name'], $_POST['phone_number'], $_POST['email'], $_POST['wedding_date'], $_POST['booking_date'], $_POST['booking_hour'], $_POST['information'])){

	$name = $_POST['name'];
	$phone_number = $_POST['phone_number'];
	$email = $_POST['email'];
	$wedding_date = date("Y-m-d", strtotime($_POST['wedding_date']));
	$booking_date = date("Y-m-d", strtotime($_POST['booking_date']));
	$booking_hour = date("H:i:s", strtotime($_POST['booking_hour']));
	$information = $_POST['information'];
	
	$booking_time = $booking_date . ' ' . $booking_hour;

	$sql = "INSERT INTO bookings (name, phone_number, email, information, booking_time, wedding_date) 
	VALUES ('". esc($db, $name) ."','". esc($db, $phone_number) ."','". esc($db, $email) ."','". esc($db, $information) ."','". $booking_time ."','". $wedding_date ."')";
	
	if ($db->query($sql) === TRUE) {
	    echo "success";
	} else {
	    echo "Error: " . $sql . "<br>" . $conn->error;
	}
	
}
?>