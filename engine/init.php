<?php

define('FOXXEY', true);
require ('data/config.php');
session_start();

	class init extends initConfig {
		
		private $initHelper;
		private $groupAssociacion;
		
		protected $debug, $logger, $db;
		protected static $usrArray = array(
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
		
		//@Deprecated
		protected static $links;

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
			$this->requireNestedClasses();
			$this->db = new db($config['dbUser'], $config['dbPass'], $config['dbName'], $config['dbHost']);
			$this->logger = new Logger('lastlog');
			$this->initHelper = new initHelper($this->db, $this->logger);
			self::$usrArray['isLogged'] = @$_SESSION['isLogged'];
		}
		
		/* After init we have all modules
		 * included and no UI is sent 
		 */
		private function init() {
				self::$usrArray['realname'] = randTexts::getRandText('noName');	
				$this->initHelper->userArrFill(); //UsrArray Override (if IsLogged)
				$this->groupAssociacion = new groupAssociacion(self::$usrArray['user_group'], $this->db);
				self::$usrArray['group_name'] = $this->groupAssociacion->userGroupName();
				
				//@Deprecated
				self::$links = $this->initHelper->getLinks();
			
			require (ENGINE_DIR.'syslib/smarty/Smarty.class.php');
			$this->initHelper->modulesInc(ENGINE_DIR.'classes/modules');
		}
		
		/* After postInit we have full UI sent */
		private function postInit() {
			global $config;
			define('TEMPLATE_DIR',ROOT_DIR.'/templates/'.$config['siteTpl'].'/');
			define('UPLOADS', '/uploads/'.self::$usrArray['login'].'/');
			require (MODULES_DIR.'/FilePond/preLoad.php');
			require (ENGINE_DIR.'classes/SmartyInit.class.php');
			$smartyInit = new smartyInit(self::$links);
		}
		
		//CLASS METHODS
		private function requireNestedClasses(){
			$nestedClasses = filesInDir::filesInDirArray(__DIR__, ".php");
			foreach($nestedClasses as $key){
				if($key !== basename(__FILE__)) {
					require($key);
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