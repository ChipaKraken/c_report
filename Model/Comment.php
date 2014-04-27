<?php

include("Database.php");

class Comment {
    
    private $db;
    private $crime_id;
    private $commentor_name;
    private $comment;
    // private $rating;

    function __construct() {
        $this -> db = new Database();
    }
    
    function create($crime_id, $commentor_name, $comment) {    
        $comment_new = new Comment();
        $comment_new  -> crime_id = $crime_id;
        $comment_new  -> commentor_name = $commentor_name;
        $comment_new  -> comment = $comment;
        // $comment -> rating = 0;
        return $comment_new ;
    }

    function add() {

        $crime_id = $this -> crime_id;
        $commentor_name = $this -> commentor_name;
        $comment = $this -> comment;
		$crime_id = $this -> db ->clearText($crime_id);
		$commentor_name = $this -> db ->clearText($commentor_name);
		$comment = $this -> db ->clearText($comment);
        // $rating = $this -> rating;
        $q = "INSERT INTO comments (crime_id, commentor_name, comment) VALUES ('$crime_id', '$commentor_name', '$comment')";
        $this -> db -> runQuery($q);
    }

    function getNewsComments($id) { 
		$id = $this -> db ->clearText($id);
        $q = "SELECT * FROM comments WHERE crime_id = $id";
        $data = $this -> db ->fetchAll($q);
        print json_encode($data);
    }

    // function changeRating($id, $value) {

        // if($value == 0) {
            // $q = "UPDATE comments SET rating = rating + 1 WHERE comment_id = %id";
            // $this -> db -> query($q);
        // }
        // else {
            // $q = "UPDATE comments SET rating = rating - 1 WHERE comment_id = %id";
            // $this -> db -> query($q);
        // }
    // }

}

?>


