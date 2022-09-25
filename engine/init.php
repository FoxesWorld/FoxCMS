<?php

define('FOXXEY', true);
require ('data/config.php');
session_start();

	class init extends initConfig {
		
		protected $debug, $logger, $db;
		protected static $profileBlock = '';
		protected static $usrArray = array(
			'user_id' => 0,
			'email' => "foxengine@foxes.ru",
			'login' => "anonymous",
			'realname' => "",
			'hash' => "",
			'reg_date' => 1664055169,
			'last_date' => 1664055169,
			'password' => "",
			'user_group' => 5,
			'profilePhoto' => "avatar.jpg"
		);
		protected static $links;

		function __construct($debug = false) {
			global $config;
			require ('groupAssociacion.class.php');
			
			/* Variables assignment && userArr */
				$initFunctions = new initFunctions();
				initFunctions::libFilesInclude(ENGINE_DIR.'syslib', $this->debug);
				$this->debug = $debug;
				$this->logger = new Logger('lastlog');
				$this->db = new db($config['dbUser'], $config['dbPass'], $config['dbName'], $config['dbHost']);
				self::$links = self::getLinks();
				self::$usrArray['isLogged'] = @$_SESSION['isLogged'];
				self::$usrArray['realname'] = randTexts::getRandText('noName');
				initFunctions::userArrInit();
				
				$groupAssociacion = new groupAssociacion(self::$usrArray['user_group'], $this->db);
				self::$usrArray['group_name'] = $groupAssociacion->userGroupName();
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
				//$initFunctions->modulesInc(ENGINE_DIR.'classes/modules');
			/*************************************/
			//echo "<pre>";
			//die(var_dump(self::$usrArray));
			//echo "</pre>";
				define('TEMPLATE_DIR',ROOT_DIR.'/templates/'.$config['siteTpl'].'/');
				define('UPLOADS', '/uploads/'.self::$usrArray['login'].'/');
				require (MODULES_DIR.'/FilePond/preLoad.php');
				require (ENGINE_DIR.'classes/admin/admin.class.php');
			
			//FULL UI
			require (ENGINE_DIR.'classes/SmartyInit.class.php');
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
		
		function __construct() {
			
		}
		
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
			if(init::$usrArray['isLogged']){
				foreach($config['userDatainDb'] as $key){
					init::$usrArray[$key] = $_SESSION[$key];
				}
			}
		}
		
		
		public function modulesInc($path){
			$modulesArray = filesInDir::filesInDirArray($path);
			foreach($modulesArray as $key){
				$thisModule = $path.'/'.$key;
				$file = $thisModule.'/'.$key.'.class.php';
				switch(file_exists($thisModule.'/incOptions')){
					case true:
						$includeOptions = file::efile($thisModule.'/incOptions')["content"];
					break;
					
					case false:
					if(file_exists($file)) {
						require($file);
					}
					break;
				}
			}
		}
	}