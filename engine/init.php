<?php

define('FOXXEY', true);
require ('data/config.php');
session_start();

	class init {
		
		private $initHelper;
		private $groupAssociacion;
		private $ModulesLoader;
		private $initLevels;
		
		protected $debug, $logger, $db, $tpl;
		protected static $usrArray = array(
			'isLogged' => false,
			'user_id' => 0,
			'email' => "admin@foxesworld.ru",
			'login' => "anonymous",
			'realname' => "",
			'hash' => "",
			'reg_date' => 1664055169,
			'last_date' => CURRENT_TIME,
			'password' => "",
			'user_group' => 5,
			'profilePhoto' => "avatar.jpg"
		);
		
		protected static $REQUEST;
		protected static array $userOptions = array();
		protected static $modulesArray = array();

		function __construct($initLevels, $debug = false) {
			global $config;
			$this->initLevels = $initLevels;
			$this->preInit($debug);
			$this->init();
			$this->postInit();
		}
		
		/* In pre init we are getting prepared to run 
		 * by setting base values and 
		 * requiring nested classes 
		 */
		private function preInit($debug) {
			global $config;
			$this->debug = $debug;
			if($this->initLevels["preInit"] === true) {
				define('TEMPLATE_DIR',ROOT_DIR.'/templates/'.$config['javascript']['siteTpl'].'/');
				define('RT_DIR', TEMPLATE_DIR.'randTexts/');
				self::libFilesInclude(SYSLIB_DIR, $this->debug); //Require Syslib
				self::requireNestedClasses(basename(__FILE__), __DIR__);
				$this->db = new db($config['dbUser'], $config['dbPass'], $config['dbName'], $config['dbHost']);
				$this->logger = new Logger('lastlog');
				$this->ModulesLoader = new ModulesLoader($this->db, $this->logger);
				$this->initHelper = new initHelper($this->db, $this->logger);
				init::$modulesArray = $this->ModulesLoader->modulesInc(MODULES_DIR, "preInit");

				self::$usrArray['realname'] = randTexts::getRandText('noName');	
				initHelper::userArrFill(); //UsrArray Override (if IsLogged)
				require (SYSLIB_DIR.'smarty/Smarty.class.php');
			}
		}
		
		/* After init we have all modules
		 * included and no UI is sent 
		 */
		private function init() {
			global $config;
			if($this->initLevels["init"] === true) {
				$this->groupAssociacion = new groupAssociacion(self::$usrArray['user_group'], $this->db);
				self::$usrArray['groupName'] = $this->groupAssociacion->userGroupName();
				self::$usrArray['groupTag'] = $this->groupAssociacion->userGroupTag();
				init::$modulesArray = $this->ModulesLoader->modulesInc(MODULES_DIR, "primary");
			}
		}
		
		/* After postInit we have full UI sent */
		private function postInit() {
			if($this->initLevels["postInit"] === true) {
				init::$modulesArray = $this->ModulesLoader->modulesInc(MODULES_DIR, "secondary");
				$this->tpl = new Smarty;
				$smartyInit = new smartyInit($this->tpl);
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
	}