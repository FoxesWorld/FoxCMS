<?php
if(!defined('userUtils')) {
	die ('{"message": "Not in userUtils thread"}');
}
	class sessionManager extends utilsLoader {
		
		function __construct($userData) {
			global $config;
			for($i = 0; $i < count($userData); $i++) {
				$_SESSION[$config['userDatainDb'][$i]] = $userData[$i];
			}
			$_SESSION['isLogged'] = true;
		}
		
	}