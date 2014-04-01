<?php

class Comment {
	
	private $con;
	private $crime_id;
    private $commentor_name;
    private $comment;
    private $rating;

	function __construct() {
        $this -> con = mysqli_connect('localhost', 'ilya', 'database', 'test');
    }
	
	function create($crime_id, $commentor_name, $comment, $rating) {	
		$comment = new Comment();
		$comment -> crime_id = $crime_id;
        $comment -> commentor_name = $commentor_name;
        $comment -> comment = $comment;
		$comment -> rating = $rating;
		return $comment;
    }
}

?>