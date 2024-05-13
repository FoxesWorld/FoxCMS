<?php

	
if(!defined('profile')) {
	die ('{"message": "Not in profile thread"}');
}

	class UserActions extends User {
		
		private string $userActionReq = "user_doaction";
		private $pageTplFile = "staticPage.tpl";
		protected $db, $logger;
		private $fRequest;
		
		function __construct($db = '', $logger = '', $request = ''){
			global $config, $lang;
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
								die(json_encode(new GetBadges($db, $this->fRequest), JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES));
							break;
							
							case 'GiveBadge':
								//$GiveBadge = new GiveBadge($db, $this->fRequest);
								//$GiveBadge->giveBadge();
								die('{"message": "Unsuported"}');
							break;
								
							case 'greeting':
								$text = randTexts::getRandText('greetings');
								die('{"text": "'.$text.'"}');
							break;
							
							case 'getUnits':
								$loadUserInfo = new loadUserInfo(init::$usrArray['login'], $this->db);
								$userData = $loadUserInfo->userInfoArray();
								die($userData['balance']);
							break;

							case 'ViewProfile':
								init::classUtil('LoadUserInfo', "1.0.0");
								$loadUserInfo = new loadUserInfo(functions::filterString($request['userDisplay']), $this->db);
								$userData = $loadUserInfo->userInfoArray();
								
								if(@$userData['login']){
									$SSV = new SSV(
										GetOption::getPageContent('profile', TEMPLATE_DIR.$this->pageTplFile),
										$request['userDisplay'],
										$userData,
										$this->db, 
										$this->logger
									);
								} else {
									exit('{"error":"'.str_replace('{replace}', @$request['userDisplay'], $lang['userNotFound']).'"}');
								}
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