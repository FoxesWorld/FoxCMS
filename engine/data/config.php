<?php
	define('ROOT_DIR', 	$_SERVER['DOCUMENT_ROOT']);
	define('ENGINE_DIR',ROOT_DIR.'/engine/');
	define('MODULES_DIR',ENGINE_DIR.'modules/');
	define('CURRENT_TIME',time());
	define('CURRENT_DATE',date("d.m.Y"));
	define('REMOTE_IP',   getenv('REMOTE_ADDR'));
	require ('language/ru_ru.lang');
	
	$config = array(
	
		/* DATABASE */
		'dbHost' =>  'localhost',
		'dbUser' =>  'root',
		'dbPass' => 'Aiden2556308',
		'dbName' => 'fox_engine',
		
		'siteTpl' => 'bootstrap',
		'timezone'=> 'Europe/Moscow',
		'webserviceName'=> 'FoxEngine',
		'keyCheck' => true,
		
		/* AUTHORISATION */
		'bantime'			=> CURRENT_TIME + (120),
		'maxLoginAttempts'	=> 1,
		
		/*JavaScript*/
		'javascript' => array(
			'contentBlock' => "#content",
			'secureKey' => 'ghYyufghVH'),
		
		/*Content options*/
		'modalSearch' => '/modal',
		'modalTplBase' => '/modal/modalView/modalBase.tpl',
		'userOptions' => "/userOptions",
		'userOptionsTplBase' => "/userOptions/optionsView/optionBase.ftpl",
	
		/*Title*/
		'title' => 'FoxEngine',
		'status' => '<span class="additionalStatus">EXPERI</span>MENTAL',
		
		/* UserSettings */
		'userDatainDb'   => array("user_id", "email", "login", "password", "user_group", "realname", "hash", "reg_date", "last_date", "profilePhoto"),
		'Permissions' => array(
			'allowedProfileEdit' => array(1,4)
		)
	);