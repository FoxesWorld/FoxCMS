<?php
if(!defined('auth')) {
	die ('{"message": "Not in userUtils thread"}');
}
	class sessionManager extends AuthManager {
		
		function __construct($userData) {
			
			foreach($userData as $key => $value){
				$_SESSION[$key] = $value;
			}
			$_SESSION['isLogged'] = true;
		}
		
	}