<?php
require_once 'PHPMailer/PHPMailerAutoload.php';

if(isset($_POST['name'], $_POST['user-message'])){
	$name = $_POST['name'];
	$phone = $_POST['phone_number'];
	$email = $_POST['email'];
	$message = $_POST['user-message'];

	//Create a new PHPMailer instance
	$mail = new PHPMailer;
	$mail->CharSet = 'utf-8';
	ini_set('default_charset', 'UTF-8');

	//Set who the message is to be sent from'
	$mail->setFrom("post@aabergebrudesalong.no", "Aaberge Brudesalong");
	//Set an alternative reply-to address
	if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
		$mail->addReplyTo($email, $name);
	}else{
		$mail->addReplyTo("noreply@aabergebrudesalong.no", "Aaberge Brudesalong");
	}
	//Set who the message is to be sent to
	$mail->addAddress("aabergebrudekjole@gmail.com", "Aaberge Brudesalong");
	//Set the subject line
	$mail->Subject  = "Epost fra kunde";
	$mail->Body     = "Kunde:". $name ."\nTelefon: ". $phone ."\nEpost:". $email ."\n\n" . $message;
	
	//send the message, check for errors
	if (!$mail->send()) {
	    echo "Mailer Error: " . $mail->ErrorInfo;
	} else {
	    echo "1";
	}
}
?>