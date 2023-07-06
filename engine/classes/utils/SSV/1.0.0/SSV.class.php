<?php

	class SSV extends GetOption {
		
		private $content;
		
		function __construct($content, $userDisplay, $userData, $db, $logger) {
			global $config;
			if(@functions::userExists($userData['login'], $db)) {
				init::requireNestedClasses(basename(__FILE__), __DIR__);
				$UFR = new UserFieldsReplacement($content);
				$groupAssociacion = new groupAssociacion($userData['user_group'], $db);
				$userData["groupName"] = $groupAssociacion->userGroupName();
				if($userData !== false) {
					$this->content = $UFR->replaceUserTags($userData);
					$BAC = new BlockAccessCheck($this->content, $userData);
					$this->content = $BAC->checkBlocks();
					$replaceValuesArray = explode(',', $config['other']['OptionReplaceValues']);
					for($i = 0; $i < count($replaceValuesArray); $i++) {
						$replaceInstance = explode('->', $replaceValuesArray[$i]);
						$ValuesReplacement = new ValuesReplacement($replaceInstance[0], $replaceInstance[1], $this->content);
					}
					
					die($ValuesReplacement->getContent());
				} else {
					functions::jsonAnswer('No data for '.$userDisplay.'!', true);
				}
			} else {
				functions::jsonAnswer('User not found!', true);
			}
		}
	}