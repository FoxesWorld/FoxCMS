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
			
			protected static function userSkinInit(){
				init::classUtil('SkinViewer', "1.0.0");
				$skin = ROOT_DIR . UPLOADS_DIR . USR_SUBFOLDER . self::$usrArray['login'] . DIRECTORY_SEPARATOR . 'skin.png';
				$cape = ROOT_DIR . UPLOADS_DIR . USR_SUBFOLDER . self::$usrArray['login'] . DIRECTORY_SEPARATOR . 'cape.png';
				
				if (!skinViewer2D::isValidSkin($skin)) {
					$skin = ROOT_DIR . UPLOADS_DIR . USR_SUBFOLDER . DIRECTORY_SEPARATOR .' skin.png';
				}
				self::$usrFiles['skin'] = $skin;
				
				if(file_exists($cape)){
					self::$usrFiles['cape'] = ROOT_DIR . UPLOADS_DIR . USR_SUBFOLDER . self::$usrArray['login'] . DIRECTORY_SEPARATOR . 'cape.png';
				}
				
			}
			
			public static function getUserBadges($db, $user){
				$query = "SELECT * FROM `users` WHERE login = '".$user."'";
				$badges = $db->getRow($query);
				switch($badges){
					case false:
						//$db->run("update`users` SET `badges` = '[]')");
					break;
					
					default:
						return $badges['badges'];
					break;
				}
			}
		
			//@deprecated
			public static function getBadgesNames($db, $user){
				$namesArray = array();
				$badgesArray = json_decode(self::getUserBadges($db, $user), true);
				foreach($badgesArray as $badgeVal){
					$namesArray[] = $badgeVal['badgeName'];
				}
				return $namesArray;
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
?>