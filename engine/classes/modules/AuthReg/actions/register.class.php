<?php
if(!defined('auth')) {
	die ('{"message": "Not in auth thread"}');
}
	class register extends AuthManager {
		
		private $regData;
		private $passminCount = 5;
		private $baseUserGroup = 4;
		private $error = false;
		protected $logger, $db;
		private $SAtoCheck = array('login', 'password', 'email');
		
		function __construct($input, $db, $logger){
			global $lang;
			if(@$input["userAction"] === "register") {
				$this->logger = $logger;
				$this->db = $db;
				$this->regData = functions::collectData($input, true, true);
			}
		}
		
		private function checkPass() {
			global $lang;
			if(functions::FoxesStrlen($this->regData['password1']) >= $this->passminCount) {
				if(!preg_match("/[А-Яа-я]/", $this->regData['password1'])) {
					switch($this->regData['password1']){
						case $this->regData['password2']:
						break;
						
						default:
							functions::jsonAnswer($lang['passUnequals'], true);
						break;
					}
				} else {
					functions::jsonAnswer($lang['passBadSyms'], true);
				}
			} else {
				functions::jsonAnswer($lang['passTooShort'].functions::FoxesStrlen($this->regData['password1']), true);
			}
		}
		
		private function regGroup($code){
			$query = "SELECT groupNum from regCodes WHERE code = '".$code."'";
			$baseUserGroup = @$this->db->getRow($query)['groupNum'];
			if($baseUserGroup) {
				return $baseUserGroup;
			} else {
				return $this->baseUserGroup;
			}
		
		}
		
		protected function register() {
			global $lang, $config;
			$not_allow_symbol = array("\x22", "\x60", "\t", '\n', '\r', "\n", "\r", '\\', ",", "/", "¬", "#", ";", ":", "~", "[", "]", "{", "}", ")", "(", "*", "^", "%", "$", "<", ">", "?", "!", '"', "'", " ", "&");
			foreach($not_allow_symbol as $key){
				if(strpos($this->regData['login'], $key)) {
					exit('{"message": "Bad symbols!1!1!", "type": "warn"}');
					$this->error = true;
				}
			}
			
			$this->checkPass();
			if(!functions::checkExistingData($this->db, 'login', $this->regData['login']) === false){
				exit('{"message": "'.$lang['loginUsed'].'", "type": "warn"}');
				$this->error = true;
			}
			if(!functions::checkExistingData($this->db, 'email', $this->regData['email']) === false){
				exit('{"message": "'.$lang['emailUsed'].'", "type": "warn"}');
				$this->error = true;
			}
			if($this->error === false) {
				functions::checkSA($this->regData, $this->SAtoCheck);
				$this->logger->WriteLine("Trying to register user '".$this->regData['login']."'");
				$password = password_hash($this->regData['password1'], PASSWORD_DEFAULT);
				$photo = '/templates/'.$config['siteSettings']['siteTpl'].'/assets/img/no-photo.jpg';
				$realname = $this->regData['realname'] ?? randTexts::getRandText('noName');
				$query = "INSERT INTO `users`(`login`, `password`, `email`, `user_group`, `realname`, `hash`, `reg_date`, `reg_ip`, `logged_ip`, `last_date`, `profilePhoto`) 
				VALUES ('".$this->regData['login']."', '".$password."', '".$this->regData['email']."', '".$this->regGroup($this->regData['regCode'])."', '".$realname."', '".authorize::generateLoginHash()."', '".CURRENT_TIME."', '".REMOTE_IP."', '".REMOTE_IP."', '".CURRENT_TIME."', '".$photo."')";
				$userReg = $this->db->run($query);
				if($userReg) {
					$loadUserInfo = new loadUserInfo($this->regData['login'], $this->db);
					$userData = $loadUserInfo->userInfoArray();
					$this->logger->WriteLine("User has completed registration '".$this->regData['login']."'");
					$sessionManager = new sessionManager($userData);
					functions::jsonAnswer($lang['regComplete'], false); 
					$foxMail = new foxMail(true);
					$foxMail->send($this->regData['email'], "", "GGWP");
				} else {
					
				}
			}
		}	
	}