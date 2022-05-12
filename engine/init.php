<?php

define('FOXXEY', true);
require ('data/config.php');
session_start();

	class init extends initConfig {
		
		protected $debug, $logger, $db;
		protected static $profileBlock = '';
		protected static $isLogged;
		protected static $usrArray;

		function __construct($debug = false) {
			require (ENGINE_DIR.'classes/modules/modalsToShow.class.php');
			global $config;
			
			/* Variables assignment && userArr */
			initFunctions::libFilesInclude(ENGINE_DIR.'syslib', $this->debug);
			$this->debug = $debug;
			$this->logger = new Logger('lastlog');
			$this->db = new db($config['dbUser'], $config['dbPass'], $config['dbName'], $config['dbHost']);
			self::$isLogged = @$_SESSION['isLogged'];
			initFunctions::userArrInit();
			/***********************************/
			
			/* Requiring modules  */
			require (ENGINE_DIR.'syslib/smarty/Smarty.class.php');
			require (ENGINE_DIR.'classes/admin/admin.class.php');
			require (ENGINE_DIR.'upload.php');

			foreach(filesInDir::filesInDirArray(ENGINE_DIR.'classes/modules') as $key){
				$file = ENGINE_DIR.'classes/modules/'.$key.'/'.$key.'.class.php';
				if(file_exists($file)) {
					require($file);
				}
			}
			/*************************************/
			
			$modalsToShow = new modalsToShow($this->modalsLogged, $this->modalsUnlogged);
			require (ENGINE_DIR.'classes/smartyInit.class.php');
			$smartyInit = new smartyInit(linkBuilder::buildLinks()); //Link builder - to remove with JS
		}

	}
	
	class initFunctions extends init {
		
		public static function libFilesInclude($libDir, $debug) {
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
		
		public static function userArrInit(){
			global $config;
			if(init::$isLogged){
				foreach($config['userDatainDb'] as $key){
					init::$usrArray[$key] = $_SESSION[$key];
				}
			}
		}
		
		public static function modulesInc($path){
			$modulesArray = filesInDir::filesInDirArray($path);
			foreach($modulesArray as $key){
				$file = ENGINE_DIR.'classes/modules/'.$key.'/'.$key.'.class.php';
				if(file_exists($file)) {
					require($file);
				}
			}
		}

	}