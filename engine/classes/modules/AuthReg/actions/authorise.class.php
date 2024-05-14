<?php

if(!defined('auth')) {
	die ('{"message": "Not in auth thread"}');
}
	class authorise extends AuthManager {
		
		private $authData = array();
		protected $db;
		protected $logger;
		
		/*INPUT*/
		private $inputPassword;
		private $inputLogin;
		private $rememberMe;
		private $realPassword;
		
		function __construct($input = "", $db, $logger, $authLogin = ""){
			global $config, $lang;
			$this->db = $db;
			$this->logger = $logger;

			if(@$input["userAction"] === "auth") {
				if(!init::$usrArray['isLogged']) {
					if(is_array($input)) {
						$this->authData = functions::collectData($input, true);
						$this->inputPassword = $this->authData['password'];
						$this->inputLogin = $this->authData['login'];
						@$this->rememberMe = $this->authData["rememberMe"];
						$this->realPassword = functions::getUserData($this->inputLogin, 'password', $db);
					}
				}

			} elseif($authLogin !== "") {
				$this->setUserdata($authLogin);
			}
		}
		
		protected function auth() {
			global $lang;
			$antiBrute = new antiBrute(REMOTE_IP, $this->db, false);
			if(authorize::passVerify($this->inputPassword, $this->realPassword)) {
				//$this->setLoginHash($this->inputLogin);
				$authQuery = $this->authQueries($this->inputLogin);
				if($authQuery->type === "success") {
					$this->setUserdata($this->authData['login']);
					$this->setTokenIfNeeded($this->rememberMe, $this->inputLogin);
					$this->logger->WriteLine($this->inputLogin." successfuly authorised");
					$antiBrute->clearIp(REMOTE_IP);
					$status = true;
				} else {
					die($authQuery);
				}
			} else {
				$this->logger->WriteLine($this->authData['login']." failed authorisation with password ".$this->inputPassword);
				$antiBrute->failedAuth(REMOTE_IP);
				$status = false;
			}
			return $status;
		}
		
		private function authQueries($login) {
			$response = init::$sqlQueryHandler->updateData('users', array('last_date' => CURRENT_TIME, 'hash' => authorize::generateLoginHash($login, 16), 'logged_ip' => REMOTE_IP), 'login', $login);
			return json_decode($response);
		}
		


		private function setUserdata($login) {
			$loadUserInfo = new loadUserInfo($login, $this->db);
			$userData = $loadUserInfo->userInfoArray();
			$sessionManager = new sessionManager($userData);
			init::$usrArray['isLogged'] = true;
			initHelper::userArrFill($this->db);
		}
		
		private function setTokenIfNeeded($checkbox, $login) {
			$token = authorize::generateLoginHash($login);
			switch($checkbox) {
				case 1:
				case true:
					setcookie(AuthManager::$userToken, $token, time() + (1000 * 60 * 60 * 24 * 30));
				break;
				
				default:
					$token ="";
					setcookie(AuthManager::$userToken, "", time() - 3600);
				break;
			}
			init::$sqlQueryHandler->updateData('users', array('token' => $token), 'login', $login);
		}
	}