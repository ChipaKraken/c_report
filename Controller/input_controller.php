<?php	

	include("../Model/Model.php");
	$db = new Database('localhost', 'ilya', 'database', 'test');
	if (isset($_POST['description']) && $_POST != "") {
		$description = $_POST['description'];
		$category = $_POST['category'];
		$date = $_POST['date'];
		$time = $_POST['time'];
		$police_report = $_POST['police_report'];
		$latitude = $_POST['latitude'];
		$longitude = $_POST['longitude'];
		$db->insert($description, $category, $date, $time, $police_report, $latitude, $longitude);
	}
?>