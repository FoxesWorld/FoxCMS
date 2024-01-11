<?php
if(!defined("ADMIN")){
	die();
}

	class AdminOptions extends AdminPanel {
		
		function __construct($REQUEST, $db) {
			if(init::$usrArray['user_group'] == 1) {
				switch($REQUEST["admPanel"]){
					
					case "editServer":
						$editServer = new EditServer($db);
						$editServer->updateServer(RequestHandler::$REQUEST);
					break;
					
					case "showModules":
						die(json_encode(init::$modulesArray));
					break;
					
					case "usersList":
						die(json_encode(new UsersList($db, $REQUEST)));
					break;
					
					case "groupAssoc":
						die(json_encode(new GroupAssocAdmin($db)));
					break;
					
					case "cfgParse":
						init::classUtil('ConfigUtils', "1.0.0");
						$cfg = new ConfigParser();
						die($cfg->buildConfigPage());
					break;
					
					case "setConfig":
						init::classUtil('ConfigUtils', "1.0.0");
						die(ConfigParser::buildConfig(RequestHandler::$REQUEST));
					break;
				}
			} else {
				die('{"message": "Insufficent rights!"}');
			}
		}		
	}
