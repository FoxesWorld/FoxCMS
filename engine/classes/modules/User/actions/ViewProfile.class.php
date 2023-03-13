<?php

	class ViewProfile extends UserActions {
		
		protected $db;
		protected $logger;
		protected $profileTpl;
		protected $request;
		
		function __construct($request, $db, $logger){
			$this->db = $db;
			$this->logger = $logger;
			$this->request = $request;
			$this->profileTpl = init::$userOptions["userSettings"];
			$this->displayProfile($request['userDisplay']);
		}
		
		protected function displayProfile($userDisplay) {
			if(init::$usrArray['login'] === $userDisplay || init::$usrArray['user_group'] == 1) {
				$this->buildPageByLogin($userDisplay, array());
			} else {
				functions::jsonAnswer('Insufficent rights!', true);
			}

		}
		
		protected function buildPageByLogin($login, $replaceArray) {
				init::classUtil('LoadUserInfo', "1.0.0");
				$loadUserInfo = new loadUserInfo($login, $this->db);
				$userData = $loadUserInfo->userInfoArray();
				$GetOption = new GetOption($login);
		}
	}