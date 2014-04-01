<?php

include("Database.php");

class Comment {
    
    private $db;
    private $crime_id;
    private $commentor_name;
    private $comment;
    private $rating;

    function __construct() {
        $this -> db = new Database();
    }
    
    function create($crime_id, $commentor_name, $comment, $rating) {    
        $comment = new Comment();
        $comment -> crime_id = $crime_id;
        $comment -> commentor_name = $commentor_name;
        $comment -> comment = $comment;
        $comment -> rating = $rating;
        return $comment;
    }

    function add() {

        $crime_id = $this -> crime_id;
        $commentor_name = $this -> commentor_name;
        $comment = $this -> comment;
        $rating = 0;
        $q = "INSERT INTO comments (crime_id, commentor_name, comment, rating) VALUES ('$crime_id', '$commentor_name', '$comment', '$rating')";
        $this -> db -> query($q);
    }

    function getNewsComments($id) { 

        $q = "SELECT * FROM comments WHERE crime_id = $id";
        $data = $this -> db ->fetch_all_array($q);
        print json_encode($data);
    }

    function changeRating($id, $value) {

        if($value == 0) {
            $q = "UPDATE comments SET rating = rating + 1 WHERE comment_id = %id";
            $this -> db -> query($q);
        }
        else {
            $q = "UPDATE comments SET rating = rating - 1 WHERE comment_id = %id";
            $this -> db -> query($q);
        }
    }

}

?>


