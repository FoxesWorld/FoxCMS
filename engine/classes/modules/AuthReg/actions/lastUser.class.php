<?php

class lastUser extends AuthManager {
		
		protected $db, $logger;
		private $userParseData = array("colorScheme", "realname", "login", "profilePhoto", "reg_date");
		
		function __construct($input, $db, $logger){
			if(@$input["userAction"] === "lastUser") {
				$this->db = $db;
				$this->logger = $logger;	
			}
		}
		
		private function selectUser() {
			$sql = "SELECT * FROM users ORDER BY user_id DESC LIMIT 1";
			$data = $this->db->getRow($sql);
			$userData = array();
			foreach($data as $key => $value){
				if(in_array($key, $this->userParseData)){
					$userData[$key] = $value;
				}
			}
			return $userData;
		}
		
		protected function getUser() {
			die(json_encode($this->selectUser()));
		}
		
}