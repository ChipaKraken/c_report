<?php	

	include("../Model/Comment.php");
	if (isset($_POST['comment']) && $_POST != "") {
		$comment = $_POST['comment'];
		$commentor_name = $_POST['commentor_name'];
		$crime_id= $_POST['crime_id'];
		$comment = Comment::create($crime_id, $commentor_name, $comment);
		$comment->add();
	}
	else{
		if (isset($_POST['crime_id']) && $_POST != "")) {
			$comment = new Comment();
			$crime_id = $_POST['crime_id'];
			$comment -> getNewsComments($crime_id);
		}
		else if (isset($_POST['rating']) && $_POST != "") {
			$comment = new Comment();
			$comment_id = $_POST['comment_id'];
			$value = $_POST['ratingValue'];
		 	$comment -> changeRating($comment_id, $value);
		}
		
	}
?>