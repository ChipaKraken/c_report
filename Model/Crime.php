<?php

class Crime {

	$con = mysqli_connect('localhost', 'ilya', 'database', 'test');
	
	private $description;
    private $category;
    private $_date;
    private $_time;
    private $police_report;
    private $latitude;
    private $longitude;
	
	function __construct($description, $category, $date, $time, $police_report, $latitude, $longitude) {
        $this -> description = $description;
        $this -> category = $category;
        $this -> _date = $date;
		$this -> _time = $time;
        $this -> police_report = $police_report;
        $this -> latitude = $latitude;
        $this -> longitude = $longitude;
    }
	
	
	public function insert() {
	
		$description = $this -> description;
        $category = $this -> category;
        $date = $this -> _date; 
		$time = $this -> _time; 
        $police_report = $this -> police_report;
        $latitude = $this -> latitude;
        $longitude = $this -> longitude;
		
		$q = "INSERT INTO crimes (description, category, date, time, police_report, latitude, longitude) "
		+ "VALUES ('$description', '$category', '$date', '$time', '$police_report', '$latitude', '$longitude')";
		$cmd = mysqli_query($con, $q);
	
	}
	
	public function fetch() {
	
		$cmd = mysqli_query($con,'SELECT * FROM crimes');
		$rows = array();
		while($r = mysqli_fetch_assoc($cmd))
		{
			$rows[] = $r;
		}
		print json_encode($rows);
		
	}
}

?>