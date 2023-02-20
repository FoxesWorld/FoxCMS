<?php
		class initHelper extends init {

			protected $db;
			protected $logger;

			private $moduleIncOptionsFile = "incOptions";

			function __construct($db, $logger) {
				$this->db = $db;
				$this->logger = $logger;
			}

			//Filling usrArray each time if SESSION is set
			public static function userArrFill(){
				if($_SESSION) {			
					if($_SESSION['isLogged'] === true){
							
						foreach($_SESSION as $key => $value){
							init::$usrArray[$key] = $value;
						}

						init::$usrArray["isLogged"] = true;
					}
				}
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