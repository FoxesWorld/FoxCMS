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
				$this->fRequest = functions::collectData($request, true);
				switch(init::$REQUEST[$this->userActionReq]){

					case 'EditUser':
						require ('EditUser.class.php');
						$EditUser = new EditUser($this->fRequest, $db, $logger);
					break;
						
					case 'greeting':
						$text = randTexts::getRandText('greetings');
						die('{"text": "'.$text.'"}');
					break;
						
					default:
						functions::jsonAnswer('Unknown userRequest!', true);
					break;
				}
			}
		}
	}