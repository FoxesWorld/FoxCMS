<?php

	class GetOption extends UserOptions {
		
		private $getOptionRequest = "getOption";
		private $requestedOption;
		private $requestLogin;
		
		function __construct($userLogin){
			if(@isset($_POST[$this->getOptionRequest])){
				$this->requestedOption = functions::filterString($_POST[$this->getOptionRequest]);
				if(in_array($this->requestedOption, UserOptions::$availableForCurrentUser["optionNames"])) {
					die(UserOptions::$allOptionsArray["optContent"][$this->requestedOption]);
				} else {
				die('{"message": "No acces for option - '.$this->requestedOption.'"}');
				}
			}
		}
	}