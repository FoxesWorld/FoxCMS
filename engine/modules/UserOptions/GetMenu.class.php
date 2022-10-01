<?php
if(!defined('FOXXEY')) {
	die("Hacking attempt!");
}
	class GetMenu extends UserOptions {
		
		private $GetMenuReguest = "getUserOptionsMenu";
		private $requestLogin;
		
		function __construct($userLogin) {
			if(isset($_POST[$this->GetMenuReguest])){
				$this->requestLogin = functions::filterString($_POST[$this->GetMenuReguest]);
				if($this->requestLogin === $userLogin){
					die(UserOptions::$builtMenu);
				} else {
					die('{"message": "Incorrect login is passed!"}');
				}
				
			}
		}
		
	}