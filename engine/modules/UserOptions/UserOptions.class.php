<?php
/*FoxesModule%>
{
	"version": "V 0.1.1 Alpha",
	"description": "Module to decide what options should we show to a current user"
}
<%FoxesModule*/
if(!defined('FOXXEY')) {
	die("Hacking attempt!");
}
	$UserOptions = new UserOptions();

	class UserOptions extends init {
		
		/* THIS CODE IS LEGACY!!!
		 * A LOT OF THINGS MUST BE REDONE!!!
		 * WILL BE IMPROVED LATRER!!!
		 */
		
		/* UserOptions Configuration */
		private $scanOptionsDir;
		private $menuTpl;
		private $dataToReplace = array(
			"optionTitle", 
			"optionPreText",
			"optionName"
		);
		private $addTheLast = '<button type="submit" class="logout"><i class="fa fa-sign-out"></i> Выйти</button>';		
		protected static $allOptionsArray = array("optionFiles" => array(), "optionNames" => array());

		/* UserOptionsExport Data*/
		protected static $availableForCurrentUser = array();
		protected static $builtMenu;

		function __construct(){
			global $config;
			$this->menuTpl = TEMPLATE_DIR.$config['userOptionsTplBase'];
			$this->scanOptionsDir = TEMPLATE_DIR.$config['userOptions'];
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
			self::$allOptionsArray["optionFiles"] = filesInDir::filesInDirArray($this->scanOptionsDir, ".ftpl");
				foreach(self::$allOptionsArray["optionFiles"] as $optionFile) {
					$optionName = explode('.', $optionFile)[0];
					self::$allOptionsArray["optionNames"][] = $optionName;
					$optionContents = file::efile($this->scanOptionsDir.'/'.$optionFile)["content"];
					self::$allOptionsArray["options"][$optionName]["optContent"] = UserContent::contentTagsReplacing($optionContents);
					self::$allOptionsArray["options"][$optionName]["optSettings"] = functions::getStrBetween($optionContents, "<useroption>","</useroption>")[0];
					$scanAmmount++;
				}
				self::$allOptionsArray["optionsAmmount"] = $scanAmmount;
		}
		
		private function userOptionsArrayFilling() {
			$scanAmmount = 0;
			foreach(self::$allOptionsArray["options"] as $optionArray => $optionConf){
				if($this->isOption($optionArray)) {
				$thisOptionSettings = self::$allOptionsArray["options"][$optionArray]["optSettings"];
					$decodedOptions = json_decode($thisOptionSettings, true);
					$checkUserAccess = $this->checkUserAccess(init::$usrArray["user_group"], $decodedOptions["optionGroup"]);
					if($checkUserAccess === true) {
						self::$availableForCurrentUser[$optionArray]["optContent"] = $this->getContentByName($optionArray);
						self::$availableForCurrentUser[$optionArray]["optSettings"] = $this->getConfigByName($optionArray);
						self::$availableForCurrentUser[$optionArray]["optTitle"] = $decodedOptions["optionTitle"];
						self::$availableForCurrentUser[$optionArray]["optPreText"] = $decodedOptions["optionPreText"];
						$scanAmmount++;
					}
				}
			}
			self::$availableForCurrentUser["optionsAmmount"] = $scanAmmount;
		}
		
		private function userMenuBuild() {
			if(isset(self::$availableForCurrentUser["optionsAmmount"])) {
				$count = 0;	
				foreach(self::$availableForCurrentUser as $key => $value){
					if($this->isOption($key)) {
						$thisConfig = json_decode(self::$availableForCurrentUser[$key]["optSettings"], true);											
						$thisConfig["optionName"] = $key;
						$this->setPreset();
							foreach($thisConfig as $optArrayElement => $value) {
								if($this->isReplaceValue($optArrayElement)) {
									$this->optionTemplate = str_replace("{".$optArrayElement."}", $value, $this->optionTemplate);
								}
							}

						self::$builtMenu .= $this->optionTemplate;
						if($count === self::$availableForCurrentUser["optionsAmmount"] -1) {
							if(init::$usrArray['user_group'] !== 5) {
								self::$builtMenu .= $this->addTheLast;
							}
						}			

						self::$availableForCurrentUser["optionNames"][] = $value;
						$count++;
					}	
				}
			}
		}
		
		private function getConfigByName($name){
			return  self::$allOptionsArray["options"][$name]["optSettings"];
		}

		private function getContentByName($name){
			return  self::$allOptionsArray["options"][$name]["optContent"];
		}
		
		private function isOption($option) {
			if(in_array($option, self::$allOptionsArray["optionNames"])) {
				return true;
			} else {
				return false;
			}
		}
		
		private function isReplaceValue($value) {
			if(in_array($value,  $this->dataToReplace)) {
				return true;
			} else {
				return false;
			}
		}

		private function setPreset() {
			$this->optionTemplate = file::efile($this->menuTpl)["content"];
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
	}