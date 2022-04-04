<?php

	class authWrapper extends engine {
		
		function __construct($request, $db, $logger){
			require (ENGINE_DIR.'classes/user/auth/groupAssociacion.class.php');
			require(ENGINE_DIR.'classes/user/sessionManager.class.php');
			switch($request["userAction"]){
						
				case 'auth':
					require (ENGINE_DIR.'classes/user/auth/auth.class.php');
					$auth = new auth($_POST, $db, $logger);
				break;
						
				case 'reg':
					require (ENGINE_DIR.'classes/user/auth/reg.class.php');
					$req = new reg($_REQUEST, $db, $logger);
				break; 
						
				default:
					functions::jsonAnswer('You shall not pass!', true);
				break;
				
			}
		}

	}