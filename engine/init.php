<?php

define('FOXXEY', true);
require ('data/config.php');
session_start();

	class init {
		
		/*
			TODO
			Module setings - JSON file for each module!!!
		*/
		
		private $initHelper, $ModulesLoader, $initLevels;
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
			'logged_ip' => REMOTE_IP,
			'password' => "",
			'user_group' => 5,
			'profilePhoto' => UPLOADS_DIR.USR_SUBFOLDER."anonymous/avatar.jpg"
		);
		
		protected static array $modulesArray = array();

		function __construct($initLevels, $debug = false) {
			global $config;
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
			define('TEMPLATE_DIR',ROOT_DIR.'/templates/'.$config['javascript']['siteTpl'].'/');
			define('RT_DIR', TEMPLATE_DIR.'randTexts/');
			self::libFilesInclude(SYSLIB_DIR, $this->debug); //Require classes/Syslib
			self::requireNestedClasses(basename(__FILE__), __DIR__); //Requiring nested classes from self directory
			$this->db = new db($config['dbUser'], $config['dbPass'], $config['dbName'], $config['dbHost']);
			$this->logger = new Logger('lastlog');
			$this->ModulesLoader = new ModulesLoader($this->db, $this->logger);
			$this->initHelper = new initHelper($this->db, $this->logger); //UsrArray Override (if IsLogged)
			$RequestHandler = new RequestHandler($this->db);
			init::$modulesArray = $this->ModulesLoader->modulesInc(MODULES_DIR, "preInit");
			
		}
		
		/* After init we have all modules
		 * included and no UI is sent 
		 */
		private function init() {
			global $config;
			if($this->initLevels["init"] === true) {
				init::$modulesArray = $this->ModulesLoader->modulesInc(MODULES_DIR, "primary");
			}
		}
		
		private function postInit() {
			if($this->initLevels["postInit"] === true) {
				init::$modulesArray = $this->ModulesLoader->modulesInc(MODULES_DIR, "secondary");
			}
		}
		
		/* After postInit we have full UI sent */
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
	}