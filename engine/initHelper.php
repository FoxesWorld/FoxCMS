<?php
		class initHelper extends init {

			protected $db;
			protected $logger;
			public static $groupAssociacion;

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
				self::$groupAssociacion = new GroupAssociacion(self::$usrArray['user_group'], $db);
				self::$usrArray['groupName'] = self::$groupAssociacion->userGroupName();
				self::$usrArray['groupTag'] = self::$groupAssociacion->userGroupTag();
				self::$usrArray['user_group'] = self::$groupAssociacion->userGroupNum();
				self::$usrArray['groupName'] = self::$groupAssociacion->userGroupName();
			}
			
			protected static function userSkinInit() {
				init::classUtil('SkinViewer', "1.0.0");
				$loginHash = md5(init::$usrArray['login']);
				$skinDir = ROOT_DIR . UPLOADS_DIR . USR_SUBFOLDER . self::$usrArray['login'] . DIRECTORY_SEPARATOR;
				$skin = $skinDir . $loginHash . '-skin.png';
				$cape = $skinDir . $loginHash . '-cape.png';

				if (!skinViewer2D::isValidSkin($skin)) {
					$skin = $skinDir . $loginHash . '-skin.png';
				}
				self::$usrFiles['skin'] = $skin;

				if (file_exists($cape)) {
					self::$usrFiles['cape'] = $cape;
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
		


		class GroupAssociacion extends initHelper {
			
			private array $groupArray = [];
			private $userGroup;
			protected $db;
			private $dbTable = "groupAssociation";

			function __construct($userGroup, $db){
				$this->userGroup = $userGroup;
				$this->db = $db;
				$this->dbRequest();
			}
			
			private function dbRequest(){
				$query = "SELECT * FROM `".$this->dbTable."` WHERE groupNum = ".$this->userGroup."";
				$this->groupArray = $this->db->getRow($query);
				
				return $this->groupArray;
			}

		public function userGroupName(): string {
			$result = $this->groupArray["groupName"] ?? randTexts::getRandText('noGroup');

			if (is_string($result)) {
				if (strpos($result, ',') !== false) {
					$parts = array_filter(array_map('trim', explode(',', $result)));
					return !empty($parts) ? $parts[array_rand($parts)] : randTexts::getRandText('noGroup');
				}
				if (strlen(trim($result)) > 0) {
					return trim($result);
				}
			}

			return randTexts::getRandText('noGroup');
		}

		
		public function getColorByType(array $groupArray, string $type, string $default = '#ffffff'): string {
			foreach ($groupArray as $group) {
				if ($group['groupType'] === $type) {
					return $group['groupColor'];
				}
			}
			return $default;
		}

			/**
			 * Загрузить все группы.
			 *
			 * @return array
			 */
			public function loadAllGroups(): array {

				$selector = new GenericSelector(
					$this->db,
					$this->dbTable,
					['id', 'groupNum', 'groupName', 'groupType', 'groupColor']
				);

				return $selector->select(); // Без условий — получить всё
			}
		
			public function getGroupArray(){
				return $this->groupArray;
			}


			public function userGroupTag(){
				return $this->groupArray["groupType"] ?? "cursed";
			}

			public function userGroupColor(){
				return $this->groupArray["groupColor"] ?? "#ffffff";
			}
			
			protected function userGroupNum() {
				return $this->groupArray["groupNum"] ?? 3;
			}	
		}
?>