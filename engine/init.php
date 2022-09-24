<?php

define('FOXXEY', true);
require ('data/config.php');
session_start();

	class init extends initConfig {
		
		protected $debug, $logger, $db;
		protected static $profileBlock = '';
		protected static $isLogged = false;
		protected static $usrArray = array('login' => "anonymous", 'user_group' => 5);
		protected static $links;

		function __construct($debug = false) {
			global $config;
			
			/* Variables assignment && userArr */
				initFunctions::libFilesInclude(ENGINE_DIR.'syslib', $this->debug);
				define('TEMPLATE_DIR',ROOT_DIR.'/templates/'.$config['siteTpl'].'/');
				$this->debug = $debug;
				$this->logger = new Logger('lastlog');
				$this->db = new db($config['dbUser'], $config['dbPass'], $config['dbName'], $config['dbHost']);
				self::$links = self::getLinks();
				self::$isLogged = @$_SESSION['isLogged'];
				initFunctions::userArrInit();
			/***********************************/
			
			/* Requiring modules  */
				require (ENGINE_DIR.'syslib/smarty/Smarty.class.php');

				foreach(filesInDir::filesInDirArray(ENGINE_DIR.'classes/modules') as $key){
					$file = ENGINE_DIR.'classes/modules/'.$key.'/'.$key.'.class.php';
					if(file_exists($file)) {
						require($file);
					} else {
						$this->logger->WriteLine("Module ".$key." doesn't have a class file!");
					}
				}
			/*************************************/
				require (MODULES_DIR.'/FilePond/preLoad.php');
				require (ENGINE_DIR.'classes/admin/admin.class.php');
			
			//FULL UI
			require (ENGINE_DIR.'classes/smartyInit.class.php');
			$smartyInit = new smartyInit(self::$links);

		}
		
		protected  static function getLinks(){
			$strOut = "";
			global $config;
			foreach($config['links'] as $key => $value){
				$strOut .= '<li><a '.$config['additionalString'].' href="'.$value[1].'">'.$value[2].$value[0].'</a><li>';
			}
			return $strOut;
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
				$thisModule = ENGINE_DIR.'classes/modules/'.$key;
				switch(file_exists($thisModule.'/incOptions')){
					case true:
						$includeOptions = file::efile($thisModule.'/incOptions')["content"];
					break;
					
					case false:
					$file = $thisModule.'/'.$key.'.class.php';
					if(file_exists($file)) {
						require($file);
					}
					break;
				}
			}
		}

	}