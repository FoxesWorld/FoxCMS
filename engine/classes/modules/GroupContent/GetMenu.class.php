<?php
if(!defined('FOXXEY')) {
	die("Hacking attempt!");
}
	class GetMenu extends UserOptions {
		
		private $GetMenuRequest = "getUserOptionsMenu";
		private $requestLogin;
		
		function __construct($userLogin) {
			if(isset(RequestHandler::$REQUEST[$this->GetMenuRequest])){
				$this->requestLogin = functions::filterString(RequestHandler::$REQUEST[$this->GetMenuRequest]);
				if($this->requestLogin === $userLogin){
					die(UserOptions::$builtMenu);
				} else {
					die('{"message": "Incorrect login is supplied!"}');
				}
				
			}
		}
		
	}