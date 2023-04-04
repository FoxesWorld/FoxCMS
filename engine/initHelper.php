<?php
		class initHelper extends init {

			protected $db;
			protected $logger;
			protected static $groupAssociacion;

			function __construct($db, $logger) {
				$this->db = $db;
				$this->logger = $logger;
				self::userArrFill($db);

			}

			//Filling usrArray each time if SESSION is set
			public static function userArrFill($db){
				init::$usrArray['realname'] = randTexts::getRandText('noName');	
				if($_SESSION) {
					if($_SESSION['isLogged'] === true){
						foreach($_SESSION as $key => $value){
							init::$usrArray[$key] = $value;
						}
						init::$usrArray["isLogged"] = true;
					}

				}
				self::$groupAssociacion = new groupAssociacion(self::$usrArray['user_group'], $db);
				self::$usrArray['groupName'] = self::$groupAssociacion->userGroupName();
				self::$usrArray['groupTag'] = self::$groupAssociacion->userGroupTag();
				self::$usrArray['user_group'] = self::$groupAssociacion->userGroupNum();
			}
		}
		


		class groupAssociacion extends initHelper {
			
			private $userGroup;
			protected $db;
			private $dbTabble = "groupAssociation";

			function __construct($userGroup, $db){
				$this->userGroup = $userGroup;
				$this->db = $db;
			}
			
			private function dbRequest(){
				$query = "SELECT * FROM `".$this->dbTabble."` WHERE groupNum = ".$this->userGroup."";
				$answer = $this->db->getRow($query);
				
				return $answer;
			}

			public function userGroupName(){
				return $this->dbRequest()["groupName"] ?? randTexts::getRandText('noGroup');
			}
			
			protected function userGroupTag(){
				return $this->dbRequest()["groupType"] ?? "cursed";
			}
			
			protected function userGroupNum() {
				return $this->dbRequest()["groupNum"] ?? 3;
			}

		}