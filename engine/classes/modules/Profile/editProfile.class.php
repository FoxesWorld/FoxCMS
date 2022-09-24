<?php
if(!defined('profile')) {
	die ('{"message": "Not in profile thread"}');
}
	class editProfile extends profile {
		
		/*CFG*/
		private $dataToChange = array("realname", "email");
		
		/*EditStatus*/
		private $status = "success";
		private $statusInfo;
		
		/*INPUT*/
		private $requestArray;
		private $inputLogin;
		private $inputHash;
		private $inputPassword;
		private $inputEmail;
		private $inputGroup;
		
		protected $db;
		protected $logger;
		private $userQuery;
		
	   /*################
		*Security checks
		*	> login
		*	> foxesHash
		*	> password
		*	> email
		*	> userGroup
		*###############*/
		
		function __construct($request, $db, $logger){
			global $config, $lang;
			$this->db = $db;
			$this->logger = $logger;
			$this->requestArray = $request;
			$this->statusInfo = $lang['profileUpdated'];
			if(@$request['login']) {
				$this->inputLogin = $request['login'];
				if(@$request['foxesHash']) {
					$this->inputHash = $request['foxesHash'];
					if($this->inputHash === $this->getUserfield("hash")) {
						if(@$request['password']) {
							$this->inputPassword = $request['password'];
							if(authorize::passVerify($this->inputPassword, $this->getUserfield("password"))) {
								if(@$request['email']) {
									$this->inputEmail = $request['email'];
									if (filter_var($this->inputEmail, FILTER_VALIDATE_EMAIL)) {
										if(@$request['userGroup']) {
											$this->inputGroup = $request['userGroup'];
											if($this->inputGroup === $this->getUserfield("user_group")) {
												if(in_array($this->inputGroup, $config['allowedProfileEdit'])) {
												//ALL CHECKS PASSED
													$this->profileChanges();
													if(@$request["profilePhoto"]) {
														require_once (MODULES_DIR."FilePond/submit.php");
														routeEntry(ENTRY_FIELD, 
															[
																'FILE_OBJECTS' 				  => 'handle_file_post',
																'BASE64_ENCODED_FILE_OBJECTS' => 'handle_base64_encoded_file_post',
																'TRANSFER_IDS' 				  => 'handle_transfer_ids_post'
															], 
															$this->db, $this->logger, $this->requestArray);
													}	
													$this->updateSession();
												} else {
													$this->status = "warn";
													$this->statusInfo = $lang['restrictdUsergroup'];
												}
											} else {
												$this->status = "warn";
												$this->statusInfo = $lang['invalidUsergroup'];
											}
										} else {
											$this->status = "error";
											$this->statusInfo = $lang['noUsergroup'];
										}
									} else {
										$this->status = "warn";
										$this->statusInfo = $lang['invalidEmail'];
									}
								} else {
									$this->status = "error";
									$this->statusInfo = $lang['noEmail'];
								}
							} else {
								$this->status = "warn";
								$this->statusInfo = $lang['incorrectPassword'];
							}
						} else {
							$this->status = "error";
							$this->statusInfo = $lang['noPassword'];
						}
					} else {
						$this->status = "warn";
						$this->statusInfo = str_replace('{user}', $this->inputLogin, $lang['hashMismatch']);
					}
				} else {
					$this->status = "error";
					$this->statusInfo = $lang['noHashSent'];
				}
			} else {
				$this->status = "error";
				$this->statusInfo = $lang['noLoginSent'];
			}
			die('{"message": "'.$this->statusInfo.'", "type": "'.$this->status.'"}');
		}
		
		private function profileChanges() {
			$symbol = ",";
			$numItems = count($this->dataToChange);
			$i = 0;
			$this->passCheck($this->requestArray['newPass'], $this->requestArray['repeatPass']);
			if($this->status == "success") {
				foreach($this->dataToChange as $key){
					  if(++$i === $numItems) {		
						  $symbol = "";
					  }
					$value = $this->requestArray[$key] ?? '';
					$this->userQuery .= '`'.$key."` = '".$value."'".$symbol;	
				}
				$query = "UPDATE `users` SET ".$this->userQuery." WHERE login = '".$this->inputLogin."'";
				$this->db->run($query);
			}
		}
		
		private function updateSession() {
			require(MODULES_DIR.'AuthManager/classes/utilsLoader.class.php');
			$utilsLoader = new utilsLoader;
			$loadUserInfo = new loadUserInfo(init::$usrArray['login'], $this->db);
			$userData = $loadUserInfo->userInfoArray();
			$sessionManager = new sessionManager($userData);
		}
		
		private function passCheck($newPass, $repeatPass){
			if($newPass !== "null" || $repeatPass !== "null") {

				if($newPass != $repeatPass) {
					$this->statusInfo = "PassMismatch";
					$this->status = "error";
				}
							
				if(strlen($newPass) < 6) {
					$this->status = "warn";
					$this->statusInfo = "PassShorterThan6";
				}
							
				if(strlen($newPass) > 72) {
					$this->status = "warn";
					$this->statusInfo = "PassLonger72";
				}
				$this->userQuery = '`password` = "'.password_hash($newPass, PASSWORD_DEFAULT).'",'; 
			}
		}
		
		
		private function getUserfield($userfild){
			return functions::getUserData($this->inputLogin, $userfild, $this->db);
		}
	}