<?php

if(!defined('profile')) {
	die ('{"message": "Not in profile thread"}');
}
	class EditUser extends User {
		
		/*CFG*/
		private array $dbQureyConstruct = array("realname", "user_group", "email", "userStatus", "land", "colorScheme");
		
		/*EditStatus*/
		private string $status = "success";
		private $statusInfo;
		private $baseColor = "#bfc0c0ab";
		
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
		*	> user_group
		*###############*/
		
		function __construct($request, $db, $logger){
			global $config, $lang;
			$this->db = $db;
			$this->logger = $logger;
			$this->requestArray = $request;
			$this->statusInfo = $lang['profileEdit']['profileUpdated'];
			if(@$request['login'] !== "null" && @$request['login']) {
				$this->inputLogin = $request['login'];
				if(init::$usrArray['login'] !== "anonymous") {
				if(@$request['foxesHash'] !== "null") {
					$this->inputHash = @$request['foxesHash'];
					if($this->inputHash === $this->getUserfield("hash")) {
						if(@$request['password'] !== "null") {
							$this->inputPassword = @$request['password'];
							if(authorize::passVerify($this->inputPassword, $this->getUserfield("password")) || init::$usrArray['groupTag'] === "admin") {
								if(@$request['email'] !== "null") {
									$this->inputEmail = @$request['email'];
									if (filter_var($this->inputEmail, FILTER_VALIDATE_EMAIL)) {
										//if($this->canSetColor(@$request['colorScheme'])){ //HERE
											if(@$request['user_group'] !== "null") {
												if(@functions::FoxesStrlen($request['userStatus']) <= 32) {
												//if(@$request['user_group'] !== init::$usrArray['user_group'] && init::$usrArray['groupTag'] === "admin"){
												$this->inputGroup = $request['user_group'];
												if($this->inputGroup === $this->getUserfield("user_group") || init::$usrArray['groupTag'] === "admin") {
													$profileEditGroups = explode(',', $config['other']['canEditGroup']);
													if(in_array(init::$usrArray['user_group'], $profileEditGroups)) {
													//ALL CHECKS PASSED
														$this->profileChanges();
														if(@$request['image'] != 'null') {
															require_once (MODULES_DIR."FileUpload/submit.php");
															$loadImage = routeEntry(ENTRY_FIELD, 
																[
																	'FILE_OBJECTS' 				  => 'handle_file_post',
																	'BASE64_ENCODED_FILE_OBJECTS' => 'handle_base64_encoded_file_post',
																	'TRANSFER_IDS' 				  => 'handle_transfer_ids_post'
																], $this->db, $this->logger, $this->requestArray);
														}
														AuthManager::updateSession($this->db);
													} else {
														$this->status = "warn";
														$this->statusInfo = $lang['profileEdit']['restrictduser_group'];
													}
												} else {
													$this->status = "warn";
													$this->statusInfo = $lang['profileEdit']['invaliduser_group'];
												}
											} else {
												$this->status = "warn";
												$this->statusInfo = "Status is longer than 32!";
											}
											} else {
												$this->status = "error";
												$this->statusInfo = $lang['profileEdit']['nouser_group'];
											}
										//} else {
										//$this->status = "warn";
										//$this->statusInfo = 'invalidColour '.@$request['colorScheme'];
										//}
									} else {
										$this->status = "warn";
										$this->statusInfo = $lang['profileEdit']['invalidEmail'];
									}
								} else {
									$this->status = "error";
									$this->statusInfo = $lang['profileEdit']['noEmail'];
								}
							} else {
								$this->status = "warn";
								$this->statusInfo = $lang['profileEdit']['incorrectPassword'];
							}
						} else {
							$this->status = "error";
							$this->statusInfo = $lang['profileEdit']['noPassword'];
						}
					} else {
						$this->status = "warn";
						$this->statusInfo = str_replace('{user}', $this->inputLogin, $lang['profileEdit']['hashMismatch']);
					}
				} else {
					$this->status = "error";
					$this->statusInfo = $lang['profileEdit']['noHashSent'];
				}
				} else {
					$this->status = "warn";
					$this->statusInfo = $lang['profileEdit']['needAuthorise'];	
				}
			} else {
				$this->status = "error";
				$this->statusInfo = $lang['profileEdit']['noLoginSent'];
			}
			die('{"message": "'.$this->statusInfo.'", "type": "'.$this->status.'"}');
		}
		
		private function profileChanges() {
			$symbol = ",";
			$numItems = count($this->dbQureyConstruct);
			$i = 0;
			$this->passCheck($this->requestArray['newPass'], $this->requestArray['repeatPass']);
			if($this->status == "success") {
				foreach($this->dbQureyConstruct as $key){
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
		
		private function testColors($color){
			echo '|'.$color.'|';
			foreach($this->allColors() as $colors){
				echo $colors.' ';
			}
			die();
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
		
		private function canSetColor($color){
			global $config; 
			$allColorsofUser = $this->allColors();
			if($color != $this->baseColor){
					if(@in_array($color, $allColorsofUser)){
							return true;
					} else {
						if(in_array(init::$usrArray['colorScheme'], $this->allColors())){
							return true;
						}
				}
			} else {
				return true;
			}
			return false;
		}
		
		private function allColors(){
			global $config;
			$allColors = array();
			foreach(init::$dynamicConfig['allowedColors'] as $color){
				$allColors[] = $color;
			}
			return $allColors;
		}
		
		
		private function getUserfield($userfiled){
			return functions::getUserData($this->inputLogin, $userfiled, $this->db);
		}
	}