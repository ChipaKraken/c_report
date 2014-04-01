<?php	

	include("../Model/Comment.php");
	if (isset($_POST['comment']) && $_POST != "") {
		$comment = $_POST['comment'];
		$commentor_name = $_POST['commentor_name'];
		$crime_id= $_POST['crime_id'];
		$rating= $_POST['rating'];
		$comment = Comment::create($crime_id, $commentor_name, $comment, $rating);
		$comment->add();
	}
	else{
		$comment = new Comment();
		$comment -> fetch();
	}
?>