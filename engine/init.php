<?php

define('FOXXEY', true);
require ('data/const.php');
require ('data/config.php');

	class init {
		
		/*
			TODO
			Module setings - JSON file for each module!!!
		*/
		
		private $ModulesLoader, $initLevels;
		public static $initHelper;
		protected $debug, $logger, $db, $tpl;
		protected static $deviceType, $usrFiles, $permissions, $dynamicConfig, $sqlQueryHandler, $usrArray = array(
			'isLogged' => false,
			'user_id' => 0,
			'email' => "admin@foxesworld.ru",
			'login' => "anonymous",
			'realname' => "",
			'hash' => "",
			'reg_date' => 1664055169,
			'last_date' => CURRENT_TIME,
			'logged_ip' => REMOTE_IP,
			'password' => "",
			'user_group' => 5,
			'balance' => "[{crystals: 0},{units: 0}]",
			'profilePhoto' => UPLOADS_DIR.USR_SUBFOLDER."anonymous/avatar.jpg"
		);
		
		protected static array $modulesArray = array();

		function __construct($initLevels, $debug = false) {
			global $config;
			if(isset($_REQUEST['Authorization'])) {
				die('{"message": "TEST"}');
			}
			$this->initLevels = $initLevels;
			$this->preInit($debug);
			$this->init();
			$this->postInit();
			$this->GFXinit();
		}
		
		/* In pre init we are getting prepared to run 
		 * by setting base values and 
		 * requiring nested classes 
		 */
		private function preInit($debug) {
			global $config;
			$this->debug = $debug;
			init::classUtil('MobileDetect', "1.0.0");
			define('CURRENT_TEMPLATE',ROOT_DIR.'/templates/'.$config['siteSettings']['siteTpl'].'/');
			define('RT_DIR', CURRENT_TEMPLATE.'randTexts/');
			self::libFilesInclude(SYSLIB_DIR, $this->debug); //Require classes/Syslib
			self::requireNestedClasses(basename(__FILE__), __DIR__); //Requiring nested classes from self directory
			$this->db = new db($config['database']['dbUser'], $config['database']['dbPass'], $config['database']['dbName'], $config['database']['dbHost']);
			self::$sqlQueryHandler = new SafeSQLHandler($this->db);
			$this->logger = new Logger('lastlog');
			require('classes/modules/Module.class.php');
			$this->ModulesLoader = new ModulesLoader($this->db, $this->logger);
			self::$initHelper = new initHelper($this->db, $this->logger); //UsrArray Override (if IsLogged)
			self::$usrArray['usrFolder'] = ROOT_DIR . UPLOADS_DIR . USR_SUBFOLDER .init::$usrArray['login'] . '/';
			$RequestHandler = new RequestHandler($this->db);
			init::$modulesArray = $this->ModulesLoader->modulesInc(MODULES_DIR, "preInit");
			self::$initHelper::userSkinInit();
			$SystemRequests = new SystemRequests($this->db, $this->logger);
			self::$deviceType = new \Detection\MobileDetect;
			$SystemRequests->requestListener();

		}
		
		/* After init we have all modules
		 * included and no UI is sent 
		 */
		private function init() {
			global $config;
			if($this->initLevels["init"] === true) {
				init::$modulesArray = $this->ModulesLoader->modulesInc(MODULES_DIR, "primary");
				$PermissionsLoader = new PermissionsLoader($this->db);
				self::$permissions = $PermissionsLoader->loadPermissions();
				self::$dynamicConfig = $PermissionsLoader->permArray;
			}
		}
		
		private function postInit() {
			if($this->initLevels["postInit"] === true) {
				init::$modulesArray = $this->ModulesLoader->modulesInc(MODULES_DIR, "secondary");
			}
		}
		
		/* After GFX we have full UI sent */
		private function GFXinit() {
			if($this->initLevels["GFX"] === true) {
				init::$modulesArray = $this->ModulesLoader->modulesInc(MODULES_DIR, "GFX");
			}
		}
		
		//CLASS METHODS
		protected static function requireNestedClasses($FILE, $DIR){
			if(is_dir($DIR)) {
				$nestedClasses = filesInDir::filesInDirArray($DIR, ".php");
				if(is_array($nestedClasses)) {
					foreach($nestedClasses as $DIR_FILE){
						if($DIR_FILE !== $FILE) {
							require_once($DIR.'/'.$DIR_FILE);
						}
					}
				}
			}
		}
		
		protected static function classUtil($className, $version) {
			$classPath = UTILS_DIR.$className.DIRECTORY_SEPARATOR.$version.DIRECTORY_SEPARATOR.$className.".class.php";
			if(file_exists($classPath)){
				require_once ($classPath);
			} else {
				echo("Class util not found - ".$classPath);
			}
		}

		protected static function libFilesInclude($libDir, $debug = false) {
			global $config;
			$visualCounter = 1;
			$openDir = opendir($libDir);
			if($debug){echo "libraries to include: <br />";}
			while($file = readdir($openDir)){
				if(!is_dir($libDir.'/'.$file)) {
					if($file == '.' || $file == '..'){
						continue;
					} else {
						if($debug){ echo $visualCounter.') '.$file."<br />";$visualCounter++;}
						require_once ($libDir.'/'.$file);
					}
				}
			}
			if($debug){
				echo "<br />";
			}
		}
		
		public function getDb(){
			return $this->db;
		}
		
		public function getLogger(){
			return $this->logger;
		}
	}
?>