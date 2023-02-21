<?php
if(!defined("ADMIN")){
	die();
}

	class AdminOptions extends AdminPanel {
		
		function __construct($option) {
			switch($option){
				case "showModules":
					die(json_encode(init::$modulesArray));
				break;
			}
		}
		
	}
