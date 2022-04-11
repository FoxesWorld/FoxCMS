<?php
if(!defined('FOXXEY')) {
	die("Hacking attempt!");
}
	$advRequest = trim(strip_tags(stripslashes(@$_REQUEST['advert'])));
	$notifyParser = new notifyParser($advRequest, $this->db);
	
	class notifyParser {
		
		private $db;
		private $dbShape = "CREATE TABLE IF NOT EXISTS `notify` (
						  `status` int(11) NOT NULL,
						  `title` varchar(120) CHARACTER SET utf8 NOT NULL,
						  `message` varchar(1000) CHARACTER SET utf8 NOT NULL,
						  `link_name` varchar(90) CHARACTER SET utf8 NOT NULL,
						  `link` varchar(250) CHARACTER SET utf8 NOT NULL
						) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;";

		private $dbVal = "INSERT INTO `notify` 
		(`status`, `title`, `message`, `link_name`, `link`) VALUES 
		(1, 'You did it!', 'Advert module succesfully installed!', '', '');";
		
		function __construct($advRequest, $db){
		global $config;
			if($advRequest){
				$this->db = $db;
				$this->dbPrepare();
					$row = $this->parseAdvert();
					$title = $row['title'];
					$message = $row['message'];
					$link = $row['link'];
					$status = $row['status'];
					$link_name = $row['link_name'];

					$request_success = array(
					'type' => 'success',
					'status' => $status,
					'title' => $title,
					'message' => $message,
					'link_name' => $link_name,
					'link' => $link);
					$request_success = json_encode($request_success);

				die($request_success);
			}
		}
		
		private function parseAdvert(){	
			$row = $this->db->getRow("SELECT * FROM notify");
		return $row;
		}
		
		private function dbPrepare(){
			$creation = $this->db->run($this->dbShape);
			if($this->parseAdvert() === false){
				$this->db->run($this->dbVal);
			}
		}
	}
?>