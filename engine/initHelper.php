<?php
		class initHelper extends init {

			protected $db;
			protected $logger;

			private $moduleIncOptionsFile = "incOptions";

			function __construct($db, $logger) {
				$this->db = $db;
				$this->logger = $logger;
			}

			public function userArrFill(){
				global $config;
				if(init::$usrArray['isLogged'] === true){
					foreach($config['userDatainDb'] as $key){
						init::$usrArray[$key] = $_SESSION[$key];
					}
				}
			}

			protected function modulesInc($path, $includePriority = "") {
				
				$modulesIncluded = array();
				$counter = 0;
				$modulePriority = "primary";
				$modulesArray = filesInDir::filesInDirArray($path);

				foreach($modulesArray as $moduleName){
					$currentModuleDirectory = $path.DIRECTORY_SEPARATOR.$moduleName;
					$mainClassFile = $moduleName.'.class.php';
					$moduleIncOptFile = $currentModuleDirectory.DIRECTORY_SEPARATOR.$this->moduleIncOptionsFile;
					$moduleMainFilePath = $currentModuleDirectory.DIRECTORY_SEPARATOR.$mainClassFile;

					if(file_exists($moduleIncOptFile)) {
						$moduleIncOptFileContents = file::efile($moduleIncOptFile)["content"];
						$moduleIncOptFileArray = json_decode($moduleIncOptFileContents, true);
						foreach($moduleIncOptFileArray as $optionName => $optionValue) {
							if($optionName === "classFile") {
								switch($optionValue) {


									case "includeFile":
										$mainClassFile = $moduleIncOptFileArray["mainClass"];
										$moduleMainFilePath = $currentModuleDirectory.DIRECTORY_SEPARATOR.$mainClassFile;
									break;

									case "noInclude":
										unset($moduleMainFilePath);
									break;
								}
							}

							if($optionName === "priority") {
								$modulePriority = $optionValue;
							}
						}
					}

					if(isset($moduleMainFilePath)) {
						if(file_exists($moduleMainFilePath)) {
						$moduleInfo = $this->readModuleInfo($moduleMainFilePath);
							$version = $moduleInfo["version"] ?? "unknown";
							$description = $moduleInfo["description"] ?? "No description";
							$modulesIncluded["modulesArray"][$moduleName] = array(
								"moduleName" => $moduleName,
								"version" => $version,
								"description" => $description,
								"moduleMainClass" => $mainClassFile,
								"modulePriority" => $modulePriority
							);

							if(isset($modulePriority)) {
								if($modulePriority === $includePriority) {
									require_once($moduleMainFilePath);
								}
							} else {
								require_once($moduleMainFilePath);
							}
							$counter++;
						}
					}
				}
				$modulesIncluded["modulesammount"] = $counter;

				return $modulesIncluded;
			}
			
			private function readModuleInfo($path) {
				$decodedOptions = "";
				$moduleContents = file::efile($path)["content"];
				$moduleInfo = functions::getStrBetween($moduleContents, "/*FoxesModule%>","<%FoxesModule*/");
				if(count($moduleInfo) > 0) {
					$decodedOptions = json_decode($moduleInfo[0], true);
				}
				
				return $decodedOptions;
			}
		}

		class groupAssociacion extends init {

			private $userGroup;
			protected $db;
			private $dbTabble = "groupAssociation";

			function __construct($userGroup, $db){
				$this->userGroup = $userGroup;
				$this->db = $db;
			}

			public function userGroupName(){
				$query = "SELECT * FROM `".$this->dbTabble."` WHERE groupNum = ".$this->userGroup."";
				$answer = $this->db->getRow($query);

				return $answer["groupType"];
			}

		}