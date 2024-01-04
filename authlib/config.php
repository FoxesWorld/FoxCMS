<?php
define("FOXXEY", true);
define('ROOT_DIR', 	$_SERVER['DOCUMENT_ROOT']);
define('ENGINE_DIR',ROOT_DIR.'/engine/');
define('CURRENT_DATE',date("d.m.Y"));
require (ROOT_DIR."/engine/classes/syslib/syslog");
define('CURRENT_TIME',time());

$config = array(
'db_user' =>"foxesworld",
'db_pass' => "Er!vJ43CdxqzjWNB",
'db_database' => "foxesworld_foxcms",
'letterHeadLine' => "FoxesWorld EXP",
'skinUrl' => 'https://foxescraft.ru/uploads/users/'
);

$LOGGER = new Logger('authlib');

require (__DIR__.'/fun.class.php');