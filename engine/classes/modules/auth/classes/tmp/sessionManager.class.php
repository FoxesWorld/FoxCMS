<?php

	class sessionManager {
		
		function __construct($userData) {
			global $config;
			for($i = 0; $i < count($userData); $i++) {
				if($userData[$i] !== null) {
					//echo $userData[$i].' - '.$config['userDatainDb'][$i].'<br />';
					$_SESSION[$config['userDatainDb'][$i]] = $userData[$i];
				} else {
					$_SESSION[$config['userDatainDb'][$i]] = randTexts::getRandText('noName');
				}
			}
			$_SESSION['isLogged'] = true;
		}
		
	}