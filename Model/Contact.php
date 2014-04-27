<?php

include("Database.php");

class Contact {
	private $db;
	private $name;
    private $email;
    private $message;
	
	function __construct() {
		$this -> db = new Database();
    }
	
	function create($name, $email, $message) {	
		$contact = new Contact();
		$contact -> name = $name;
        $contact -> email = $email;
        $contact -> message = $message;
		return $contact;
    }	
	
	
	public function insert() {
	
		$name = $this -> name;
        $email = $this -> email;
        $message = $this -> message; 
		$q = "INSERT INTO contact (Name, Email, Message) VALUES ('$name', '$email', '$message')";
		$this -> db -> runQuery($q);	
	}
	
	public function fetch() {
		$q = "SELECT * FROM contact";
		$data = $this -> db ->fetchAll($q);
		print json_encode($data);	
	}
}
?>