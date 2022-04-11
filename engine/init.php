<?php

define('FOXXEY', true);
require ('data/config.php');
session_start();

	class init {
		
		protected $debug;
		protected $logger;
		protected static $profileBlock = '';
		protected $db;

		//Files to include
		//{Name} => (type, path, exclude, enabled)
		protected $toIncludeArray = array(
			"FoxEngineJS" 		=>	array('.js',  ENGINE_DIR.'/skins/FoxEngine/js/', '', true), 
			"FoxEngineCSS" 		=>	array('.css', ENGINE_DIR.'/skins/FoxEngine/css/', '', true),
			"Bootstrap-icons" 	=>	array('.css', ENGINE_DIR.'/skins/Bootstrap-icons/', '', true),
			"BootstrapJS" 		=>	array('.js',  ENGINE_DIR.'/skins/Bootstrap/js/', '.map', true),
			"BootstrapCSS" 		=>	array('.css', ENGINE_DIR.'/skins/Bootstrap/css/', '.map', false));
		
		//Modals to unlogged
		protected $modalsUnlogged = array(
			"login" => array("Авторизация", "Что бы на сайт войти логин и пароль нам нужно ввести", "%file:=auth"),
			"reg" 	=> array("Регистрация", "Регистрируйтесь пожалуйста", "%file:=reg")
		);
		
		protected $modalsLogged = array(
			"cp" => array("Личный кабинет", "Посмотрим, что мы тут можем поменять...", "%file:=cp")
		);
		
		function __construct($debug = false) {
			global $config;
			
			$this->debug = $debug;
			initFunctions::libFilesInclude(ENGINE_DIR.'/lib', $this->debug);
			$this->logger = new Logger('lastlog');
			$this->db = new db($config['dbUser'], $config['dbPass'], $config['dbName'], $config['dbHost']);

			require (ENGINE_DIR.'lib/smarty/Smarty.class.php');
			foreach(filesInDir::filesInDirArray(ENGINE_DIR.'classes/modules') as $key){
				require(ENGINE_DIR.'classes/modules/'.$key.'/'.$key.'.class.php');
			}
			
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

	}