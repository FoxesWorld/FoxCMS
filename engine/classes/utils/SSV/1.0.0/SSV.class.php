<?php

	class SSV extends GetOption {
		
		private $content;
		
		function __construct($content, $userDisplay, $db, $logger) {
			init::requireNestedClasses(basename(__FILE__), __DIR__);
			$FR = new FieldsReplacement($content);
			$userData = $this->getUserData($userDisplay, $db);
			$groupAssociacion = new groupAssociacion($userData['user_group'], $db);
			$userData["groupName"] = $groupAssociacion->userGroupName();
			if($userData !== false) {
				$this->content = $FR->replaceUserTags($userData);
				$BAC = new BlockAccessCheck($this->content, $userData);
				die($BAC->checkBlocks());
			} else {
				functions::jsonAnswer('No data for '.$userDisplay.'!', true);
			}
		}
		
		private function getUserData($login, $db) {
			init::classUtil('LoadUserInfo', "1.0.0");
			$loadUserInfo = new loadUserInfo($login, $db);
			$userData = $loadUserInfo->userInfoArray();
			return $userData;
		}
		
		private function checkUserExistance($userDisplay, $db) {
			
		}
		
	}