<?php	

	include("../Model/Contact.php");
	if (isset($_POST['name']) && $_POST != "") {
		$name = $_POST['name'];
		$email = $_POST['email'];
		$message = $_POST['message'];
		$contact = Contact::create($name, $email, $message);
		$contact->insert();
	}
	else{	
		$contact = new Contact();
		$contact -> fetch();
	}
?>