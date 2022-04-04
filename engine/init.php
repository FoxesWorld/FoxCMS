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
		protected $toIncludeArray = array(
			"JS" =>	array('.js', ENGINE_DIR.'/classes/js/',	true), 
			"CSS" =>array('.css',ENGINE_DIR.'/skins/css/',	true));
		
		//Modals to unlogged
		protected $modalsUnlogged = array(
		"login" => array("Авторизация", "Что бы на сайт войти логин и пароль нам нужно ввести", "%file:=auth"),
		"reg" 	=> array("Регистрация", "Регистрируйтесь пожалуйста", "%file:=reg"));
		
		function __construct($debug = false) {
			global $config;
			
			$this->debug = $debug;
			initFunctions::libFilesInclude(ENGINE_DIR.'/lib', $this->debug);
			$this->logger = new Logger('lastlog');
			$this->db = new db($config['dbUser'], $config['dbPass'], $config['dbName'], $config['dbHost']);
			
			require (ENGINE_DIR.'engine.php');
			require (ENGINE_DIR.'lib/smarty/Smarty.class.php');
			require (ENGINE_DIR.'classes/linkBuilder.class.php');
			require (ENGINE_DIR.'classes/smartyInit.class.php');
			require (ENGINE_DIR.'classes/notify/notify-parser.php');
			require (ENGINE_DIR.'classes/user/userInit.class.php');

				$userInit 	= new userInit($this->db, $this->logger);
				$builtLinks = new linkBuilder;
				$smartyInit = new smartyInit($builtLinks->buildLinks());

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