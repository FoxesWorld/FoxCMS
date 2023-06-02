<?php

	class SSV extends GetOption {
		
		private $content;
		
		function __construct($content, $userDisplay, $userData, $db, $logger) {
			global $config;
			init::requireNestedClasses(basename(__FILE__), __DIR__);
			$UFR = new UserFieldsReplacement($content);
			$groupAssociacion = new groupAssociacion($userData['user_group'], $db);
			$userData["groupName"] = $groupAssociacion->userGroupName();
			if($userData !== false) {
				$this->content = $UFR->replaceUserTags($userData);
				$BAC = new BlockAccessCheck($this->content, $userData);
				$this->content = $BAC->checkBlocks();
				$ValuesReplacement = new ValuesReplacement($config['OptionReplaceValues'], $this->content);
				die($ValuesReplacement->getContent());
			} else {
				functions::jsonAnswer('No data for '.$userDisplay.'!', true);
			}
		}
		
		
	}