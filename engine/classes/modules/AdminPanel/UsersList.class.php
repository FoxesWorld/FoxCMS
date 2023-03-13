<?php
if(!defined("ADMIN")){
	die();
}

	class UsersList extends AdminPanel {
		
		protected $db;
		protected $request;
		protected $usersArray;
		
		function __construct($db, $REQUEST) {
			$this->db = $db;
			$this->request = $REQUEST;
			$this->parseUsers();
		}
		
		protected function parseUsers() {
			$query = "SELECT * FROM `users` WHERE login LIKE '%".$this->request['userMask']."%'";
			$usersArray = $this->db->getRows($query);
			foreach($usersArray as $key => $value){
				$this->usersArray[] = array($key => $value);
			}
			die(json_encode($this->usersArray));
		}
		
	}