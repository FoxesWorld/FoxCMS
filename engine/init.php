<?php

define('FOXXEY', true);
require ('data/config.php');
require (ENGINE_DIR.'classes/modules/modalsToShow.class.php');
session_start();

	class init extends initConfig {
		
		protected $debug;
		protected $logger;
		protected static $profileBlock = '';
		protected $db;

		function __construct($debug = false) {
			global $config;
			
			$this->debug = $debug;
			initFunctions::libFilesInclude(ENGINE_DIR.'/lib', $this->debug);
			$this->logger = new Logger('lastlog');
			$this->db = new db($config['dbUser'], $config['dbPass'], $config['dbName'], $config['dbHost']);

			require (ENGINE_DIR.'lib/smarty/Smarty.class.php');
			foreach(filesInDir::filesInDirArray(ENGINE_DIR.'classes/modules') as $key){
				$file = ENGINE_DIR.'classes/modules/'.$key.'/'.$key.'.class.php';
				if(file_exists($file)) {
					require($file);
				}
			}
			$modalsToShow = new modalsToShow($this->modalsLogged, $this->modalsUnlogged);
			
			require (ENGINE_DIR.'classes/smartyInit.class.php');
			$smartyInit = new smartyInit(linkBuilder::buildLinks());
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