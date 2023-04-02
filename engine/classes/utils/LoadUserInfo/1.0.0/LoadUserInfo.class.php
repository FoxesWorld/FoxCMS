<?php
	class loadUserInfo {
		
		private $userInfoArray = array();
		
		function __construct($login, $db){

			switch($login){
				case null:
					functions::jsonAnswer("Login not found!");
				break;
				
				default:
					$query = "SELECT * FROM `users` WHERE login = '".$login."'";
					$this->userInfoArray = $db->getRow($query);
				break;
			}

			$logged = true;
			$this->userInfoArray['isLogged'] = $logged;
		}
		
		public function userInfoArray(){
			return $this->userInfoArray;
		}
		
	}