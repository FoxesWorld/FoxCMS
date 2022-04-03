<?php

	class userActions extends userInit {
		
		private $userActionReq = "userProfileAction";
		
		function __construct(){
			global $config;
			if(@$_REQUEST[$this->userActionReq]){
				if(@$_REQUEST['key'] === $config['secureKey']) {
					switch(@$_REQUEST[$this->userActionReq]){
						case 'logout':
							$this->logout();
						break;
						
						case 'profile':
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
			session_destroy();
			functions::jsonAnswer('Logged out!', false);
		}
		
	}