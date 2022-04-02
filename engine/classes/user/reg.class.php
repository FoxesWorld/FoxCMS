<?php
if(!defined('FOXXEY')) {
	die ('{"message": "Not in FOXXEY thread"}');
}
	class reg {
		
		private $regData;
		private $passminCount = 5;
		private $baseUserGroup = 4;
		private $logger;
		private $db;
		
		function __construct($input, $db, $logger){
			$this->logger = $logger;
			$this->db = $db;
			$this->regData = functions::collectData($input, true);
			$this->checkPass();
			$this->regiter();
		}
		
		private function checkPass() {
			if(functions::FoxesStrlen($this->regData['password']) >= $this->passminCount) {
				if(!preg_match("/[А-Яа-я]/", $this->regData['password'])) {
					switch($this->regData['password']){
						case $this->regData['password2']:
						break;
						
						default:
							functions::jsonAnswer("pass.notEquals", true);
						break;
					}
				} else {
					functions::jsonAnswer("pass.badSyms", true);
				}
			} else {
				functions::jsonAnswer("pass.tooShort".functions::FoxesStrlen($this->regData['password']), true);
			}
		}
		
		private function regiter(){
			functions::checkSA($this->regData);
			$this->logger->WriteLine("Trying to register user '".$this->regData['login']."'");
			$password = password_hash($this->regData['password'], PASSWORD_DEFAULT);
			$query = "INSERT INTO `users`(`login`, `password`, `email`, `user_group`, `realname`, `hash`, `reg_date`, `last_date`) 
			VALUES ('".$this->regData['login']."', '".$password."', '".$this->regData['email']."', '".$this->baseUserGroup."', '', '".authorize::generateLoginHash()."', '".CURRENT_TIME."', '".CURRENT_TIME."')";
			$userReg = $this->db->run($query);
			if($userReg) {
				functions::jsonAnswer("Registration complete!", false); 
			} else {
				
			}
		}
		
	}
	
