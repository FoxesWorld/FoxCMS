<?php

define('FOXXEY', true);
require ('data/config.php');
session_start();

	class init {
		
		private $initHelper;
		private $groupAssociacion;
		
		protected $debug, $logger, $db;
		protected static $usrArray = array(
			'isLogged' => false,
			'user_id' => 0,
			'email' => "foxengine@foxes.ru",
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
		protected static $modulesArray = array();

		function __construct($debug = false) {
			global $config;
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
			self::libFilesInclude(ENGINE_DIR.'syslib', $this->debug); //Require Syslib
			self::requireNestedClasses(basename(__FILE__), __DIR__);
			$this->db = new db($config['dbUser'], $config['dbPass'], $config['dbName'], $config['dbHost']);
			$this->logger = new Logger('lastlog');
			$this->initHelper = new initHelper($this->db, $this->logger);

			init::$modulesArray = $this->initHelper->modulesInc(MODULES_DIR, "preInit");
			
			self::$usrArray['realname'] = randTexts::getRandText('noName');	
			$this->initHelper->userArrFill(); //UsrArray Override (if IsLogged)
			require (ENGINE_DIR.'syslib/smarty/Smarty.class.php');
		}
		
		/* After init we have all modules
		 * included and no UI is sent 
		 */
		private function init() {
			global $config;
				
			$this->groupAssociacion = new groupAssociacion(self::$usrArray['user_group'], $this->db);
			self::$usrArray['group_name'] = $this->groupAssociacion->userGroupName();
				
			define('TEMPLATE_DIR',ROOT_DIR.'/templates/'.$config['siteTpl'].'/');
			define('UPLOADS', '/uploads/'.self::$usrArray['login'].'/');
			
			init::$modulesArray = $this->initHelper->modulesInc(MODULES_DIR, "primary");	
		}
		
		/* After postInit we have full UI sent */
		private function postInit() {
			init::$modulesArray = $this->initHelper->modulesInc(MODULES_DIR, "secondary");
			$smartyInit = new smartyInit();
		}
		
		//CLASS METHODS
		protected static function requireNestedClasses($FILE, $DIR){
			$nestedClasses = filesInDir::filesInDirArray($DIR, ".php");
			foreach($nestedClasses as $DIR_FILE){
				if($DIR_FILE !== $FILE) {
					require_once($DIR.'/'.$DIR_FILE);
				}
			}
		}

		private static function libFilesInclude($libDir, $debug) {
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