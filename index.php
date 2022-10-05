<?php
	$initArray = array("preInit" => true, "init" => true, "postInit" => true);
	Error_Reporting(E_ALL);
	Ini_Set('display_errors', true);
	require ('engine/init.php');
	$init = new init($initArray, false);
?>