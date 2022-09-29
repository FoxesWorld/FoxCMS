<?php

	
if(!defined('profile')) {
	die ('{"message": "Not in profile thread"}');
}

	class UserActions extends User {
		
		private $userActionReq = "user_doaction";
		protected $db, $logger;
		private $fRequest;
		
		function __construct($db = '', $logger = '', $request = ''){
			global $config;
			$this->db = $db;
			$this->logger = $logger;
			if(@$_REQUEST[$this->userActionReq]){
				if(@$_REQUEST['key'] === $config['secureKey']) {
					$this->fRequest = functions::collectData($request, true);
					switch(@$_REQUEST[$this->userActionReq]){

						case 'logout':
							$this->logout();
						break;
						
						case 'EditUser':
							require ('EditUser.class.php');
							$EditUser = new EditUser($this->fRequest, $db, $logger);
						break;
						
						case 'adminAction':
							switch(init::$usrArray["user_group"]) {
								case 1:
									$text = '<a class=\"button-three\" href=\"#adm\">Adminpanel</a>';
								break;
									
								default:
									$text = randTexts::getRandText('greetings');
								break;
							} 
							die('{"text": "'.$text.'"}');
						break;
						
						default:
							functions::jsonAnswer('Unknown userRequest!', true);
						break;
					}
				} else {
					functions::jsonAnswer('Wrong secure key!', true);
				}
			}
		}
		
		protected function logout(){
			global $lang;
			if(init::$usrArray["isLogged"] === true) {
				session_destroy();
				functions::jsonAnswer($lang['loggedOut'], false);
			} else {
				functions::jsonAnswer("Cant logOut!", true);
			}
		}
	}