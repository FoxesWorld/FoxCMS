<?php
	/* System path */
	define('ROOT_DIR', 	$_SERVER['DOCUMENT_ROOT']);
	define('ENGINE_DIR',ROOT_DIR.'/engine/');
	define('MODULES_DIR', ENGINE_DIR.'classes/modules/');
	define('UTILS_DIR', ENGINE_DIR.'classes/utils/');
	define('SYSLIB_DIR', ENGINE_DIR.'classes/syslib/');

	/*	Upload Settings  */
	define('UPLOADS_DIR', '/uploads/');
	define('USR_SUBFOLDER', 'users/');

	require ('language/ru_ru.lang');
	define('CURRENT_TIME',time());
	define('CURRENT_DATE',date("d.m.Y"));
	define('REMOTE_IP',   getenv('REMOTE_ADDR'));
	
	$config = array(
	
		/* DATABASE */
		'dbHost' =>  'localhost',
		'dbUser' =>  'aidenfox',
		'dbPass' => 'fNt5DL9dNcA347XG',
		'dbName' => 'aidenfox',
		
		'reCaptchaCheck' => true,
		'pluginsDir' => ROOT_DIR.'/plugins/',
		
		'timezone'=> 'Europe/Moscow',
		'webserviceName'=> 'FoxEngine',
		'keyCheck' => true,
		
		/* AUTHORISATION */
		'bantime'			=> CURRENT_TIME + (120),
		'maxLoginAttempts'	=> 1,
		
		/*JavaScript*/
		'javascript' => array(
			'contentBlock' => "#content",
			'secureKey' => 'ghYyufghVH',
			'siteTpl' => 'foxengine',
			'assets' => '/templates/foxengine/assets/',
			'allowedColors' => array(
				"admin" => array("#e4005d9e", "#3cc9489e", "#e72f00ad", "#2656caad"),
				"user" => array("#e4005d9e", "#3cc9489e", "#2656caad", "#26caad")),
			'uploads' => UPLOADS_DIR.USR_SUBFOLDER,
			'debug' => true),
		
		/*Content options*/
		'userOptions' => "userOptions",
		'pageTplFile' => "cfg/pageTpl.ftpl",
	
		/*Title*/
		'title' => 'FoxEngine',
		'status' => 'Modular',
		
		/* UserSettings */
		'userFieldsArray'   => array("user_id", "email", "login", "password", "user_group", "realname", "hash", "reg_date", "last_date", "logged_ip", "profilePhoto", "userStatus", "land", "colorScheme", "groupName"),
		'Permissions' => array(
			'allowedProfileEdit' => array(1,4)
		)
	);