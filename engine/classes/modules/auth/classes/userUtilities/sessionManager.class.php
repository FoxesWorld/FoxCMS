<?php
if(!defined('userUtils')) {
	die ('{"message": "Not in userUtils thread"}');
}
	class sessionManager extends utilsLoader {
		
		function __construct($userData) {
			global $config;
			for($i = 0; $i < count($userData); $i++) {
				if($userData[$i] !== null) {
					$_SESSION[$config['userDatainDb'][$i]] = $userData[$i];
				} else {
					$_SESSION[$config['userDatainDb'][$i]] = randTexts::getRandText('noName');
				}
			}
			$_SESSION['isLogged'] = true;
		}
		
	}