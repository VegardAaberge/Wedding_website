<?php
require_once 'PHPMailer/PHPMailerAutoload.php';

if(isset($_POST['name'], $_POST['phone_number'], $_POST['email'], $_POST['wedding_date'], $_POST['booking_date'], $_POST['booking_hour'], $_POST['information'])){
	$name = $_POST['name'];
	$email = $_POST['email'];
	$date = $_POST['booking_date'];
	$time = $_POST['booking_hour'];
 
	//Create a new PHPMailer instance
	$mail = new PHPMailer;
	$mail->CharSet = 'utf-8';
	ini_set('default_charset', 'UTF-8');

	//Set who the message is to be sent from'
	$mail->setFrom("post@aabergebrudesalong.no", "Aaberge Brudesalong");
	//Set an alternative reply-to address
	$mail->addReplyTo("post@aabergebrudesalong.no", "Aaberge Brudesalong");
	//Set who the message is to be sent to
	$mail->addAddress($email, $name);
	//Set the subject line
	$mail->Subject  = "Bestilling av Time";
	$mail->Body     = "Hei ". $name .", \n\nTakk for din bestilling av time. \n\nVi gleder oss til å se deg " . $date .
	" klokken " . $time. ". Har du noen spørsmål så er det bare å besvare denne eposten eller ringe oss på 46285022. \n\nMVH Aaberge Brudesalong \n46285022 \nHalmeveien 78B \n0351 Oslo \naabergebrudekjole.no";

	//send the message, check for errors
	if (!$mail->send()) {
	    echo "Mailer Error: " . $mail->ErrorInfo;
	} else {
	    echo "1";
	}
}
?>