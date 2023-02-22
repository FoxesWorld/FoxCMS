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
			'siteTpl' => 'foxengine'),
		
		/*Content options*/
		'modalSearch' => '/modal',
		'modalTplBase' => '/modal/modalView/modalBase.tpl',
		'userOptions' => "/userOptions",
		'userOptionsTplBase' => "/userOptions/optionsView/optionBase.ftpl",
		'pageTplFile' => "pageTpl.ftpl",
	
		/*Title*/
		'title' => 'FoxEngine',
		'status' => 'Alpha',
		
		/* UserSettings */
		'userDatainDb'   => array("user_id", "email", "login", "password", "user_group", "realname", "hash", "reg_date", "last_date", "profilePhoto"),
		'Permissions' => array(
			'allowedProfileEdit' => array(1,4)
		)
	);