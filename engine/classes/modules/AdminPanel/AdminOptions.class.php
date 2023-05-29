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
					die(json_encode(new UsersList($db, $REQUEST)));
				break;
				
				case "groupAssoc":
					die(json_encode(new GroupAssocAdmin($db)));
				break;
			}
		}
		
	}
