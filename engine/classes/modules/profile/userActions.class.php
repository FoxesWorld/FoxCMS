<?php
if(!defined('profile')) {
	die ('{"message": "Not in profile thread"}');
}

	class userActions extends profile {
		
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
						
						case 'editProfile':
							require ('classes/editProfile.class.php');
							$editProfile = new editProfile($this->fRequest, $db, $logger);
						break;
						
						case "loadPhoto":
							require_once (MODULES_DIR."FilePond/submit.php");
						break;
						
						case 'userInfo':
							require ('classes/userInfo.class.php');
							$userInfo = new userInfo($this->fRequest['data']);
						break;
						
						case 'adminAction':
							switch(init::$usrArray["user_group"]) {
								case 1:
									$text = '<a class=\"button-three\" href=\"#adm\">Adminpanel</a>';
								break;
									
								default:
									$text = randTexts::getRandText('greetings')." ".init::$usrArray['realname']."!";
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
			session_destroy();
			functions::jsonAnswer('Logged out!', false);
		}
		
	}