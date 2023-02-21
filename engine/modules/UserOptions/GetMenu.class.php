<?php
if(!defined('FOXXEY')) {
	die("Hacking attempt!");
}
	class GetMenu extends UserOptions {
		
		private $GetMenuRequest = "getUserOptionsMenu";
		private $requestLogin;
		
		function __construct($userLogin) {
			if(isset(init::$REQUEST[$this->GetMenuRequest])){
				$this->requestLogin = functions::filterString(init::$REQUEST[$this->GetMenuRequest]);
				if($this->requestLogin === $userLogin){
					die(UserOptions::$builtMenu);
				} else {
					die('{"message": "Incorrect login is supplied!"}');
				}
				
			}
		}
		
	}