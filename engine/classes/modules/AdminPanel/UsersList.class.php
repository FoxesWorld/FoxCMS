<?php
if(!defined("ADMIN")){
	die();
}

	class UsersList extends AdminPanel implements JsonSerializable {
		
		protected $db;
		protected $request;
		protected $usersArray;
		
		function __construct($db, $REQUEST) {
			$this->db = $db;
			$this->request = $REQUEST;
			$this->parseUsers();
		}
		
		protected function parseUsers() {
			if($this->request['userMask'] == "*") {
				$query = "SELECT * FROM `users`";
			} else {
				$query = "SELECT * FROM `users` WHERE login LIKE '%".$this->request['userMask']."%'";
			}
			
			$usersArray = $this->db->getRows($query);
			foreach($usersArray as $key => $value){
				$this->usersArray[] = array($key => $value);
			}
		}
		
		public function jsonSerialize() {
			return $this->usersArray;
		} 
		
	}