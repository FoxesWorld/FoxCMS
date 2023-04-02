<?php
if(!defined("ADMIN")){
	die();
}

	class AdminOptions extends AdminPanel {
		
		function __construct($REQUEST, $db) {
			switch($REQUEST["admPanel"]){
				case "showModules":
					die(json_encode(init::$modulesArray));
				break;
				
				case "usersList":
					$UsersList = new UsersList($db, $REQUEST);
				break;
			}
		}
		
	}
