<?php
	/* System path */
	define('ROOT_DIR', 	$_SERVER['DOCUMENT_ROOT']);
	define('ENGINE_DIR',ROOT_DIR.'/engine/');
	define('CACHE_DIR',ROOT_DIR.'/engine/cache/');
	define('TEMPLATE_DIR',ROOT_DIR.'/templates/');
	define('PLUGINS_DIR',ROOT_DIR.'/plugins/');
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