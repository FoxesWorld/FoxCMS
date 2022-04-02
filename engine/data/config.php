<?php
	define('ROOT_DIR', 	$_SERVER['DOCUMENT_ROOT']);
	define('ENGINE_DIR',ROOT_DIR.'/engine/');
	define('CURRENT_TIME',time());
	define('CURRENT_DATE',date("d.m.Y"));
	
	$config = array(
	
		'dbHost' =>  'localhost',
		'dbUser' =>  'root',
		'dbPass' => 'P$Ak$O2sJZSu$aAKOBqkokf@Vs5%YCj',
		'dbName' => 'fox_radio',
		'siteTpl' => 'default',
		'timezone'=> 'Europe/Moscow',
		'webserviceName'=> 'FoxRadio',
		'secureKey' => 'ghYyufghVH',
		
		/* UserSettings */
		'userDatainDb' => array("user_id", "email", "login", "password", "user_group", "realname", "hash", "reg_date", "last_date"),
		
		'filterSymbols' => array ("\x22", "\x60", "\t", '\n', '\r', "\n", "\r", '\\', ",", "/", "¬", "#", ";", ":", "~", "[", "]", "{", "}", ")", "(", "*", "^", "%", "$", "<", ">", "?", "!", '"', "'", " ", "&", '"' )
	
	);