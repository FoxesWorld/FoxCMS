<?php

//die('Adding info!!!');
	class addProject extends InformationOptions {
				
		protected $db;
		protected $logger;
		
		private $projectDataArray;
		
		function __construct($db, $logger) {
			$this->db = $db;
			$this->logger = $logger;
			$this->projectDataArray['title'] = init::$REQUEST["title"];
			$this->projectDataArray['hyperlink'] = functions::translit(init::$REQUEST["hyperlink"]);
			$this->projectDataArray['projectState'] = init::$REQUEST["projectState"];
			$this->projectDataArray['year'] = init::$REQUEST["year"];
			$this->projectDataArray['data'] = init::$REQUEST["data"];
			$this->projectDataArray['story'] = init::$REQUEST["story"];
			
			$this->addShortInfo();
			$this->addFullInfo();
			die('{"message": "Успешное добавление '.$this->projectDataArray['title'].'", "type": "success"}');
			
		}
		
		private function addShortInfo() {
			$table = "info";
			//$check = $this->hyperlinkCheck($table, $this->projectDataArray['hyperlink']);
			//die(var_dump($check));
			//if($check){
				$query = "INSERT INTO `".$table."`(`title`, `data`, `year`, `hyperlink`, `projectState`, `image`) VALUES
				(".$this->projectDataArray['title'].",".$this->projectDataArray['data'].",".$this->projectDataArray['year'].",".$this->projectDataArray['hyperlink'].",".$this->projectDataArray['projectState'].",'')";
				$this->db->query($query);
			//}
		}
		
		private function addFullInfo() {
			$table = "fullInfo";
			//$check = $this->hyperlinkCheck($table, $this->projectDataArray['hyperlink']);
			//if($check){
				$query = "INSERT INTO `".$table."`(`title`, `hyperlink`, `story`, `image`) VALUES
				(".$this->projectDataArray['title'].",".$this->projectDataArray['hyperlink'].",".$this->projectDataArray['story'].",'')";
				$this->db->query($query);
			//}
			
		}

/*
		private function hyperlinkCheck($table, $link){
			$query = "SELECT title FROM `".$table."` WHERE hyperlink = '".$link."'";
			try {
			$result = $this->db->getValue($query);
				//die('{"message": "Already have a '.$link.' hyperlink!"}');
				switch($result){
					case false:
						return true;
					break;
					
					default:
						return false;
					break;
				}
			} catch(PDOException $e) {}
		} */
		
	}