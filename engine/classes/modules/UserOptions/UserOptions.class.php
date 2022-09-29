<?php

	$UserOptions = new UserOptions();

	class UserOptions extends init {
		
		/* THIS CODE IS ELEGACY!!!
		 * A LOT OF THINGS MUST BE REDONE!!!
		 * WILL BE IMPROVED LATRER!!!
		 */
		
		/* UserOptions Configuration */
		private $scanOptionsDir = TEMPLATE_DIR.'user/userOptions';
		private $menuTpl = "/menuTpl";
		private $dataToReplace = array(
			"optionTitle", 
			"optionPreText",
			"optionName"
		);
		private $addTheLast = '<button type="submit" class="logout"><i class="fa fa-sign-out"></i> Выйти</button>';		
		protected static $allOptionsArray = array("optionFiles" => array(), "optionNames" => array());

		/* UserOptionsExport Data*/
		protected static $availableForCurrentUser = array("optionNames" => array());
		protected static $builtMenu;

		function __construct(){
			global $config;
			init::requireNestedClasses(basename(__FILE__), __DIR__);
			$this->allOptionsFilling();
			$this->userOptionsArrayFilling();
			$this->userMenuBuild();
			$GetMenu = new GetMenu(init::$usrArray['login']);
			$GetOption = new GetOption(init::$usrArray['login']);
		}
		
		/*	
		 * Filling all found options Array
		 */
		private function allOptionsFilling() {
			
			$scanAmmount = 0;
			self::$allOptionsArray["optionFiles"] = filesInDir::filesInDirArray($this->scanOptionsDir, ".tpl");
				foreach(self::$allOptionsArray["optionFiles"] as $optionFile) {
					$optionName = explode('.', $optionFile)[0];
					self::$allOptionsArray["optionNames"][] = $optionName;
					$optionContents = file::efile($this->scanOptionsDir.'/'.$optionFile)["content"];
					self::$allOptionsArray["optContent"][$optionName] = $this->contentTagsReplacing($optionContents);
					self::$allOptionsArray["optSettings"][$optionName] = functions::getStrBetween($optionContents, "<useroption>","</useroption>")[0];
					$scanAmmount++;
				}
				self::$allOptionsArray["optionsAmmount"] = $scanAmmount;
		}
		
		private function userOptionsArrayFilling() {
			$scanAmmount = 0;
			foreach(self::$allOptionsArray["optSettings"] as $optionName => $optionConf){				
					$decodedOptions = json_decode($optionConf, true);
					$checkUserAccess = $this->checkUserAccess(init::$usrArray["user_group"], $decodedOptions["optionGroup"]);
					if($checkUserAccess === true) {
						self::$availableForCurrentUser["optionNames"][] = $optionName;
						$scanAmmount++;
					}
			}
			self::$availableForCurrentUser["optionsAmmount"] = $scanAmmount;
		}
		
		private function userMenuBuild() {
			if(isset(self::$availableForCurrentUser["optionsAmmount"])) {
				for($count = 0; $count < self::$availableForCurrentUser["optionsAmmount"]; $count++){
					$optFile = self::$availableForCurrentUser["optionNames"][$count];
					$thisConfig = json_decode($this->getConfigByName($optFile), true);
					$thisConfig["optionName"] = $optFile;
					$this->setPreset();
					foreach($thisConfig as $key => $value) {
						
						if(in_array($key, $this->dataToReplace)) {
							$this->optionTemplate = str_replace("{".$key."}", $value, $this->optionTemplate);
						}
					}
				self::$builtMenu .= $this->optionTemplate;
				}

				if($count === self::$availableForCurrentUser["optionsAmmount"]) {
					if(init::$usrArray['user_group'] !== 5) {
						self::$builtMenu .= $this->addTheLast;
					}
				}
			}
		}
		
		private function getConfigByName($name){
			return  self::$allOptionsArray["optSettings"][$name];
		}

		private function setPreset(){
			$this->optionTemplate = file::efile(__DIR__.$this->menuTpl)["content"];
		}
		
		private function checkUserAccess($usergroup, $optionAccessGroup){
			switch(is_array($optionAccessGroup)){
				case true:
					if(in_array($usergroup, $optionAccessGroup)) {
						return true;
					}
					break;
						
					case false:
						if($usergroup == $optionAccessGroup){
							return true;
						}
					break;
			}
			return false;
		}
		
		private function contentTagsReplacing($content){
			foreach(init::$usrArray as $userField => $value){
				$toReplace = "[".$userField."]";
				if(strpos($content,$toReplace)) {
					$content = str_replace($toReplace, $value, $content);
				}
			}
			return $content;
		}
	}