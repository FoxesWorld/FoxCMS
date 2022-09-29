<?php
	define('ROOT_DIR', 	$_SERVER['DOCUMENT_ROOT']);
	define('ENGINE_DIR',ROOT_DIR.'/engine/');
	define('MODULES_DIR',ROOT_DIR.'/engine/classes/modules/');
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
		'secureKey' => 'ghYyufghVH',
		
		/* AUTHORISATION */
		'bantime'			=> CURRENT_TIME + (120),
		'maxLoginAttempts'	=> 1,
		
		'modalSearch' => '/modal/',
		
	/*WebSite Appeareance*/
	
		/*Title*/
		'title' => 'FoxEngine',
		'status' => '<span class="additionalStatus">Post-</span>Alpha',
		
		/* UserSettings */
		'userDatainDb'   => array("user_id", "email", "login", "password", "user_group", "realname", "hash", "reg_date", "last_date", "profilePhoto"),
		'Permissions' => array(
			'allowedProfileEdit' => array(1,4)
		)
		
	);