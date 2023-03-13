<?php
if(!defined('auth')) {
	die ('{"message": "Not in userUtils thread"}');
}
	class loadUserInfo extends AuthManager {
		
		private $userInfoArray = array();
		
		function __construct($login, $db){
			$query = "SELECT * FROM `users` WHERE login = '".$login."'";
			$this->userInfoArray = $db->getRow($query);
		}
		
		public function userInfoArray(){
			return $this->userInfoArray;
		}
		
	}