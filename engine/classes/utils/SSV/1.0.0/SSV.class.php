<?php

	class SSV extends GetOption {
		
		private $content;
		
		function __construct($content, $userDisplay, $userData, $db, $logger) {
			global $config;
			//if($userDisplay == init::$usrArray['login'] || init::$usrArray['groupTag'] == "admin") {
				if(@functions::userExists($userData['login'], $db)) {
					init::requireNestedClasses(basename(__FILE__), __DIR__);
					$UFR = new UserFieldsReplacement($content);
					$groupAssociacion = new GroupAssociacion($userData['user_group'], $db);
					$userData["groupName"] = $groupAssociacion->userGroupName();
					$groupService = new GroupNames($db);
					$groups = $groupService->jsonSerialize();
					$userData["groupColor"] = self::getColorByType($groups, $groupAssociacion->userGroupTag());
					if($userData !== false) {
						$this->content = $UFR->replaceUserTags($userData);
						$BAC = new BlockAccessCheck($this->content, $userData);
						$this->content = $BAC->checkBlocks();
						$replaceValuesArray = explode(',', $config['other']['OptionReplaceValues']);
						for($i = 0; $i < count($replaceValuesArray); $i++) {
							$replaceInstance = explode('->', $replaceValuesArray[$i]);
							$valuesReplacement = new ValuesReplacement($replaceInstance[0], $replaceInstance[1], $this->content);
							$this->content = $valuesReplacement->getContent();
						}
						
						die($valuesReplacement->getContent());
					} else {
						functions::jsonAnswer('No data for '.$userDisplay.'!', true);
					}
				} else {
					functions::jsonAnswer('User not found!', true);
				}
			//}
		}
		
		
		public static function getColorByType(array $groupArray, string $type, string $default = '#ffffff'): string {
			foreach ($groupArray as $group) {
				if ($group['groupType'] === $type) {
					return $group['groupColor'];
				}
			}
			return $default;
		}
		

	}