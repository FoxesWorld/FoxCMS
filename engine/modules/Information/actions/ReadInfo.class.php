<?php

	class ReadInfo extends InformationOptions {
		
		protected $db;
		protected $logger;
		private $data;
		
		function __construct($db, $logger, $data) {
			$this->db = $db;
			$this->logger = $logger;
			$this->data = $data;
		}
		
		protected function selectLine($table) {
			foreach($this->data as $key => $value){
			$counter = 0;

			
			
			$query = "SELECT * FROM `".$table."` WHERE ".$key." = '".$value."'";
			$answer = $this->db->getRows($query);
			switch($answer){
				case false:
					$answer = array("message" => "Line ".$key." with value ".$value." not found!");
				break;
				
				default:
					foreach($answer as $key){
						$counter++;
					}
				break;
			}

			switch($table){
				case "info":
					$outputJson["constructionList"] = $answer;
					
				break;
				
				case "fullInfo":
					$outputJson = $answer;
				break;
			}
			$outputJson["constructionsAmmount"] = $counter;
			
			return json_encode($outputJson,JSON_UNESCAPED_UNICODE);
			}
		}
		
	}