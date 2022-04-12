<?php
if(!defined('auth')) {
	die ('{"message": "Not in auth thread"}');
}
	class auth extends authWrapper {
		
		private $authData = array();
		
		function __construct($input, $db, $logger){
			global $config;
			$this->authData = functions::collectData($input, true);
			$inputPassword = $this->authData['password'];
			$userPassword = functions::getUserData($this->authData['login'], 'password', $db);
			if(authorize::passVerify($inputPassword, $userPassword)) {
				$userData = array();
				$this->authUpdates($this->authData['login'], $db);

				foreach($config['userDatainDb'] as $key){
					switch($key){
						case 'user_group':
							$groupAssociacion = new groupAssociacion(functions::getUserData($this->authData['login'], $key, $db), $db);
							$userData[] = $groupAssociacion->userGroupName()["groupType"];
						break;
						
						default:
							$userData[] = functions::getUserData($this->authData['login'], $key, $db);
						break;
					}
					
				}
				$sessionManager = new sessionManager($userData);
				$logger->WriteLine($this->authData['login']." successfuly authorised");
				functions::jsonAnswer("Успешная авторизация!", false);
			} else {
				$logger->WriteLine($this->authData['login']." failed authorisation with password ".$this->authData['password']);
				$antiBrute = new antiBrute(REMOTE_IP, $db, false);
				functions::jsonAnswer("Неверный логин или пароль!");
			}
		}
		
		private function authUpdates($login, $db){
			$query = "UPDATE `users` SET hash='".authorize::generateLoginHash()."', last_date='".CURRENT_TIME."' WHERE login = '".$login."'";
			$db->query($query);
		}

	}