<?php
	define('ROOT_DIR', 	$_SERVER['DOCUMENT_ROOT']);
	define('ENGINE_DIR',ROOT_DIR.'/engine/');
	define('CURRENT_TIME',time());
	define('CURRENT_DATE',date("d.m.Y"));
	define('REMOTE_IP',   getenv('REMOTE_ADDR'));
	
	$config = array(
	
		/* DATABASE */
		'dbHost' =>  'localhost',
		'dbUser' =>  'root',
		'dbPass' => 'P$Ak$O2sJZSu$aAKOBqkokf@Vs5%YCj',
		'dbName' => 'fox_radio',
		
		'siteTpl' => 'default',
		'timezone'=> 'Europe/Moscow',
		'webserviceName'=> 'FoxEngine',
		'secureKey' => 'ghYyufghVH',
		
		'radioStream' => "https://radio.macros-core.com:8443/live",
		
		/* AUTHORISATION */
		'bantime'			=> CURRENT_TIME + (120),
		'maxLoginAttempts'	=> 1,
		
	/*WebSite Appeareance*/
	
		/*Title*/
		'title' => 'FoxEngine',
		'status' => 'Alpha',
		
		/* LINKS */
		'links' => array(
		array('TressModal', '#tess', '<i class="fa fa-user" aria-hidden="true"></i>'),
		array('Wesp', 'wesp.ru', '<i class="fa fa-money" aria-hidden="true"></i>')
		),
		'additionalString' => 'onclick="$(this).notify(\'Work In Progress!\', \'info\'); return false"',
		
		/* UserSettings */
		'userDatainDb'   => array("user_id", "email", "login", "password", "user_group", "realname", "hash", "reg_date", "last_date"),
		'userDataToShow' => array('login', 'realname', 'user_group', 'email'),
		'filterSymbols'  => array ("\x22", "\x60", "\t", '\n', '\r', "\n", "\r", '\\', ",", "/", "¬", "#", ";", ":", "~", "[", "]", "{", "}", ")", "(", "*", "^", "%", "$", "<", ">", "?", "!", '"', "'", " ", "&", '"' )
	
	);