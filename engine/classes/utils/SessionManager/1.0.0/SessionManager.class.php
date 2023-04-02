<?php
	class sessionManager {
		
		function __construct($userData) {
			if(is_array($userData)) {
				foreach($userData as $key => $value){
					$_SESSION[$key] = $value;
				}	
			$_SESSION['isLogged'] = true;		
		}
	}
	
}