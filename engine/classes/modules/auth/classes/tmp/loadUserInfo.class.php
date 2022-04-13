<?php

	class loadUserInfo {
		
		private $userInfoArray = array();
		
		function __construct($login, $db){
			global $config;
			foreach($config['userDatainDb'] as $key){
				switch($key){
					case 'user_group':
						$groupAssociacion = new groupAssociacion(functions::getUserData($login, $key, $db), $db);
						$this->userInfoArray[] = $groupAssociacion->userGroupName()["groupType"];
					break;
						
					default:
						$this->userInfoArray[] = functions::getUserData($login, $key, $db);
					break;
				}	
			}
		}
		
		public function userInfoArray(){
			return $this->userInfoArray;
		}
		
	}