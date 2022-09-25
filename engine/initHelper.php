<?php
		class initHelper extends init {
			
			protected $db;
			protected $logger;
			
			function __construct($db, $logger) {
				$this->db = $db;
				$this->logger = $logger;
			}

			public function userArrFill(){
				global $config;
				if(init::$usrArray['isLogged']){
					foreach($config['userDatainDb'] as $key){
						init::$usrArray[$key] = $_SESSION[$key];
					}
				}
			}

			public function modulesInc($path){
				global $config;
				$modulesArray = filesInDir::filesInDirArray($path);
				foreach($modulesArray as $key){
					$thisModule = $path.'/'.$key;
					$file = $thisModule.'/'.$key.'.class.php';
					switch(file_exists($thisModule.'/incOptions')){
						case true:
							$includeOptions = json_decode(file::efile($thisModule.'/incOptions')["content"], false);
							switch($includeOptions->classFile){
								
								case "noInclude":
								break;
								
								case "includeFile":
									require ($thisModule.'/'.$includeOptions->mainclass);
								break;
							}
							
						break;
						
						case false:
						if(file_exists($file)) {
							require($file);
						}
						break;
					}
				}
			}

			//@Deprecated
			protected  function getLinks(){
				$strOut = "";
				global $config;
				foreach($config['links'] as $key => $value){
					$strOut .= '<li><a '.$config['additionalString'].' href="'.$value[1].'">'.$value[2].$value[0].'</a><li>';
				}
				return $strOut;
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