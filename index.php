<?php
//die(var_dump($_POST));
if(!file_exists('install.php') && file_exists('engine/data/config.php')) {
	$initArray = array("init" => true, "postInit" => true, "GFX" => true);
	Error_Reporting(E_ALL);
	Ini_Set('display_errors', true);
	require ('engine/init.php');
	$init = new init($initArray, false);
} else {
	if(file_exists('install.php')) {
		require ('install.php');
	} else {
		die('FoxEngine is not installed and install file is being missed!');
	}
}
?>