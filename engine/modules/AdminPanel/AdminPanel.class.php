<?php
/*FoxesModule%>
{
	"version": "V 0.0.1",
	"description": "An adminpanel module"
}
<%FoxesModule*/
	$AdminPanel = new AdminPanel();
	class AdminPanel extends init {
		
		function __construct() {
			if(isset(init::$REQUEST["admPanel"])) {
				if(init::$usrArray["user_group"] == 1) {
					//echo "<pre>";
					//var_dump(init::$modulesArray);
					//echo "</pre>";
					die(json_encode(init::$modulesArray));
				} else {
					die('{"message": "Insufficent rights!"}');
				}
			}
		
		}
		
	}