<?php

	class RequestHandler extends init {
		
		public static $REQUEST;

		function __construct($db) {
			self::ipCheck();
			if(count($_POST) > 0) {
				$thisRequest = $_POST;
				$this->updateUserOnline($db, init::$usrArray);
					@$keyCheck = $this->checkSecureKey($thisRequest["key"]);
					if($keyCheck === true){
						foreach($thisRequest as $key => $value){
							if($value) {
								self::$REQUEST[$key]  = functions::filterString($value);
							} else {
								self::$REQUEST[$key]  = functions::filterString("undefined");
							}
						}
					} else {
						die('{"message": "'.@$thisRequest["key"].' - Is a wrong secure key!"}');
					}
			}
		}
		
		private static function ipCheck(){
			if(init::$usrArray['logged_ip'] != REMOTE_IP) {
				AuthManager::logout("Suspected ip change!");
			}
		}
		
		private function updateUserOnline($db, $usrArray){
			if($usrArray['isLogged']) {
				$db->query("UPDATE `users` SET last_date='".CURRENT_TIME."' WHERE login = '".$usrArray['login']."'");
			}
		}
		
		private function checkSecureKey($key) {
			global $config;
			if($config["keyCheck"]) {
				if(count($thisRequest["key"]) <= 0) {
					switch($key) {
						case "":
						case null:
							return false;

						default:
						if($key === $config['javascript']["secureKey"]){
								return true;
							} else {
								return false;
							}
					}
				} else {
					die('{"message": "No secure key!"}');
				}
			} else {
				return true;
			}
		}
		
	}