<?php

	
if(!defined('profile')) {
	die ('{"message": "Not in profile thread"}');
}

	Error_Reporting(E_ALL);
	Ini_Set('display_errors', true);

	class UserActions extends User {
		
		private string $userActionReq = "user_doaction";
		protected $db, $logger;
		private $fRequest;
		
		function __construct($db = '', $logger = '', $request = ''){
			global $config;
			
				$this->db = $db;
				$this->logger = $logger;
				$userAction = @$request[$this->userActionReq];
				if(isset($userAction)) {
						$this->requireFile($userAction);
						$this->fRequest = functions::collectData($request, true);
						switch($userAction){

							case 'EditUser':
								$EditUser = new EditUser($this->fRequest, $db, $logger);
							break;
							
							case 'GetBadges':
								$badges = new GetBadges($db, $this->fRequest);
								die($badges->getBadgesHTML());
							break;
								
							case 'greeting':
								$text = randTexts::getRandText('greetings');
								die('{"text": "'.$text.'"}');
							break;

							case 'ViewProfile':
								$SSV = new SSV(
									GetOption::getPageContent('userSettings', TEMPLATE_DIR.$config['pageTplFile']),
									$request['userDisplay'],
									$this->db, 
									$this->logger
								);
							break;
								
							default:
								functions::jsonAnswer('Unknown userRequest!', true);
							break;
						}
				}

		}
		

		private function requireFile($req){
			$file = __DIR__.DIRECTORY_SEPARATOR.'actions'.DIRECTORY_SEPARATOR.$req.'.class.php';
			if(file_exists($file)){
				require ($file);
			}
		}
	}