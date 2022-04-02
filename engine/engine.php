<?php
if(!defined('FOXXEY')) {
	die ('{"message": "Not in FOXXEY thread"}');
}
	class engine {
		
		function __construct($request = null, $db, $logger){
			$logger->WriteLine('Engine init!');
			$request=functions::filterString($request);
			if(functions::FoxesStrlen($request) > 0) {
				
				switch($request){
					
					case 'auth':
						require (ENGINE_DIR.'classes/user/auth.class.php');
						$auth = new auth($_POST, $db, $logger);
					break;
					
					case 'reg':
						require (ENGINE_DIR.'classes/user/reg.class.php');
						$req = new reg($_REQUEST, $db, $logger);
					break;
					
					default:
						functions::jsonAnswer('Unknown request!', true);
					break;
					
				}
				
			} else {
				functions::jsonAnswer('No request!', true);
			}
			
		}
		
	}