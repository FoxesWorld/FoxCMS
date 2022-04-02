<?php
if(!defined('FOXXEY')) {
	die ('{"message": "Not in FOXXEY thread"}');
}
	class sessionManager {
		
		function __construct($userData) {
			global $config;
			for($i = 0; $i < count($userData); $i++) {
				$_SESSION[$config['userDatainDb'][$i]] = $userData[$i];

			}
			$_SESSION['isLogged'] = true;
		}
		
	}