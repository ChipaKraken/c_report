<?php	

	include("../Model/Crime.php");
	if (isset($_POST['description']) && $_POST != "") {
		$description = $_POST['description'];
		$category = $_POST['category'];
		$date = $_POST['date'];
		$time = $_POST['time'];
		$police_report = $_POST['police_report'];
		$latitude = $_POST['latitude'];
		$longitude = $_POST['longitude'];
		$crime = Crime::create($description, $category, $date, $time, $police_report, $latitude, $longitude);
		$crime->insert();
	}
	else{
		if (isset($_GET['crime_id']) && $_POST != "") {
			$crime = new Crime();
			$crime_id = $_GET['crime_id'];
			$crime -> fetchById($crime_id);
		}
		else if (isset($_GET['category']) && $_POST != "") {
			$crime = new Crime();
			$category = $_GET['category'];
			$crime -> fetchByCategory($category);
		} 	
		else {		
			$crime = new Crime();
			$crime -> fetch();
		}
	}
?>