<?php

class Crime {

	private $con;
	private $description;
    private $category;
    private $_date;
    private $_time;
    private $police_report;
    private $latitude;
    private $longitude;
	
	
	function __construct() {
        $this -> con = mysqli_connect('localhost', 'ilya', 'database', 'test');
    }
	
	function create($description, $category, $date, $time, $police_report, $latitude, $longitude) {	
		$crime = new Crime();
		$crime -> description = $description;
        $crime -> category = $category;
        $crime -> _date = $date;
		$crime -> _time = $time;
        $crime -> police_report = $police_report;
        $crime -> latitude = $latitude;
        $crime -> longitude = $longitude;
		return $crime;
    }	
	
	
	public function insert() {
	
		$description = $this -> description;
        $category = $this -> category;
        $date = $this -> _date; 
		$time = $this -> _time; 
        $police_report = $this -> police_report;
        $latitude = $this -> latitude;
        $longitude = $this -> longitude;
		
		$q = "INSERT INTO crimes (description, category, date, time, police_report, latitude, longitude) VALUES ('$description', '$category', '$date', '$time', '$police_report', '$latitude', '$longitude')";
		$cmd = mysqli_query($this -> con, $q);
	
	}
	
	public function fetch() {		
		
		$con = mysqli_connect('localhost', 'ilya', 'database', 'test');
		$cmd = mysqli_query($this -> con,'SELECT * FROM crimes');
		$rows = array();
		while($r = mysqli_fetch_assoc($cmd))
		{
			$rows[] = $r;
		}
		print json_encode($rows);
		
	}
}

?>