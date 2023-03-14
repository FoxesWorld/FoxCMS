<?php

class lastUser extends AuthManager {
		
		protected $db, $logger;
		
		function __construct($db, $logger){
			if(@init::$REQUEST["userAction"] === "lastUser") {
				$this->db = $db;
				$this->logger = $logger;	
			}
		}
		
		private function selectUser() {
			$sql = "SELECT * FROM users ORDER BY user_id DESC LIMIT 1";
			return $this->db->getRow($sql);
		}
		
		protected function getUser() {
			die(json_encode($this->selectUser()));
		}
		
}