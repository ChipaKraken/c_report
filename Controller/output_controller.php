<?php		
	include("../Model/Model.php");
	$db = new Database('localhost', 'ilya', 'database', 'test');
	$data = $db->select();
	print json_encode($data);
?>