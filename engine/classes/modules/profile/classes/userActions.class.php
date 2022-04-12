<?php

	class userActions extends profile {
		
		private $userActionReq = "userProfileAction";
		
		function __construct(){
			global $config;
			if(@$_REQUEST[$this->userActionReq]){
				if(@$_REQUEST['key'] === $config['secureKey']) {
					switch(@$_REQUEST[$this->userActionReq]){
						case 'logout':
							$this->logout();
						break;
						
						case 'editProfile':
							functions::jsonAnswer('Let`s edit!', true);
						break;
						
						case 'userInfo':
							$userInfo = new userInfo($_REQUEST['data']);
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