<?php

include("Database.php");

class Crime {
	private $db;
	private $description;
    private $category;
    private $_date;
    private $_time;
    private $police_report;
    private $latitude;
    private $longitude;
	
	
	function __construct() {
		$this -> db = new Database();
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
		$description = $this -> db ->clearText($description);
		$category = $this -> db ->clearText($category);
		$date = $this -> db ->clearText($date);	
		$time = $this -> db ->clearText($time);
		$police_report = $this -> db ->clearText($police_report);	
		$latitude = $this -> db ->clearText($latitude);
		$longitude = $this -> db ->clearText($longitude);
		$q = "INSERT INTO crimes (description, category, date, time, police_report, latitude, longitude) VALUES ('$description', '$category', '$date', '$time', '$police_report', '$latitude', '$longitude')";
		$this -> db -> runQuery($q);	
	}
	
	public function fetch() {
		$q = "SELECT * FROM crimes";
		$data = $this -> db ->fetchAll($q);
		print json_encode($data);	
	}
	
	public function fetchById($id) {
		$id = $this -> db ->clearText($id);
		$q = "SELECT * FROM crimes WHERE crime_id = $id";
        $data = $this -> db ->fetchAll($q);
        print json_encode($data);
	}

	public function fetchByCategory($array) {
		$q = "SELECT * FROM crimes WHERE ";
		$i = 0;
		$items = count($array) - 1;
		foreach($array as $cell) {
			$cell = $this -> db ->clearText($cell);
			if ($i !== $items) {
				$q .= "category = $cell OR "; 
			} else if ($i === $items) {
				$q .= "category = $cell;";
			}
			$i++;
		}
		$data = $this -> db -> fetchAll($q);
		print json_encode($data);
	}
}
?>