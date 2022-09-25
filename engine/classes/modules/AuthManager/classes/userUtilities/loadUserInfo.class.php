<?php
if(!defined('userUtils')) {
	die ('{"message": "Not in userUtils thread"}');
}
	class loadUserInfo extends utilsLoader {
		
		private $userInfoArray = array();
		
		function __construct($login, $db){
			global $config;
			foreach($config['userDatainDb'] as $key){	
				$this->userInfoArray[] = functions::getUserData($login, $key, $db);
			}
		}
		
		public function userInfoArray(){
			return $this->userInfoArray;
		}
		
	}