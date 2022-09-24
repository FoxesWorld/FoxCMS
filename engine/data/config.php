<?php
	define('ROOT_DIR', 	$_SERVER['DOCUMENT_ROOT']);
	define('ENGINE_DIR',ROOT_DIR.'/engine/');
	define('MODULES_DIR',ROOT_DIR.'/engine/classes/modules/');
	define('CURRENT_TIME',time());
	define('CURRENT_DATE',date("d.m.Y"));
	define('REMOTE_IP',   getenv('REMOTE_ADDR'));
	require ('ru_ru.lang');
	
	$config = array(
	
		/* DATABASE */
		'dbHost' =>  'localhost',
		'dbUser' =>  'root',
		'dbPass' => 'Aiden2556308',
		'dbName' => 'fox_engine',
		
		'siteTpl' => 'bootstrap',
		'timezone'=> 'Europe/Moscow',
		'webserviceName'=> 'FoxEngine',
		'secureKey' => 'ghYyufghVH',
		
		/* AUTHORISATION */
		'bantime'			=> CURRENT_TIME + (120),
		'maxLoginAttempts'	=> 1,
		
	/*WebSite Appeareance*/
	
		/*Title*/
		'title' => 'FoxEngine',
		'status' => 'Alpha',
		
		/* LINKS */
		'links' => array(
			array('TressModal', '#tess', '<i class="bi bi-bug"></i>'),
			array('Wesp', 'wesp.ru', '<i class="bi bi-emoji-wink"></i>')
		),
		'additionalString' => 'onclick="$(this).notify(\'Work In Progress!\', \'info\'); return false" class="nav-link scrollto"',
		
		/* UserSettings */
		'userDatainDb'   => array("user_id", "email", "login", "password", "user_group", "realname", "hash", "reg_date", "last_date", "profilePhoto"),
		'allowedProfileEdit' => array(1,4)
	);
	
	class initConfig {
		
		//Plugins to include
		//{Name} => (type, path, exclude, enabled)
		protected $toIncludeArray = array(
			"BaseJS" 			=>	array('.js',  ENGINE_DIR.'plugins/', 				'', 	true),
			"FoxEngineJS" 		=>	array('.js',  ENGINE_DIR.'plugins/FoxEngine/js/', 	'', 	true),
			"FoxEngineCSS" 		=>	array('.css', ENGINE_DIR.'plugins/FoxEngine/css/', 	'', 	true),
			"FontAwesomeCSS" 	=>	array('.css', ENGINE_DIR.'plugins/FontAwesome/css/', 	'', 	true),
			"BootstrapJS" 		=>	array('.js',  ENGINE_DIR.'plugins/Bootstrap/js/', 	'.map', true),
			"BootstrapCSS" 		=>	array('.css', ENGINE_DIR.'plugins/Bootstrap/css/', 	'.map', true),
			"Bootstrap-icons" 	=>	array('.css', ENGINE_DIR.'plugins/Bootstrap-icons/','', 	true),
			"FoxModalCSS" 		=>	array('.css', ENGINE_DIR.'plugins/FoxModal/css/', 	'', 	true),
			"FoxModalJS" 		=>	array('.js',  ENGINE_DIR.'plugins/FoxModal/js/', 	'', 	true),
			"PaceCSS" 			=>	array('.css', ENGINE_DIR.'plugins/Pace/', 			'', 	true),
			"PaceJS" 			=>	array('.js',  ENGINE_DIR.'plugins/Pace/', 			'',		true),
			"FilePondJS" 		=>	array('.js',  ENGINE_DIR.'plugins/FilePond/js/', 	'',		true),
			"FilePondCSS" 		=>	array('.css',  ENGINE_DIR.'plugins/FilePond/css/', 	'',		true));
		
		//Modals to show
		protected $modalsArray = array(
			"login" => array("Авторизация", "Что бы на сайт войти логин и пароль нам нужно ввести", "%file:=auth"),
			"reg" 	=> array("Регистрация", "Регистрируйтесь пожалуйста", "%file:=reg"),
			//"cp" => array("Личный кабинет", "Посмотрим <b>{realname}</b>, что ты тут можешь поменять...", "%file:=cp")
		);
	}