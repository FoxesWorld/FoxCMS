<?php
if(!defined('FOXXEY')) {
	die("Hacking attempt!");
}
	class GetOption extends UserOptions {
		
		private $getOptionRequest = "getOption";
		private $pageRplace = array();
		private $pageTplFile = "/pageTpl.ftpl";
		private $pageTemplate;
		private $requestedOption;
		private $requestLogin;
		
		function __construct($userLogin){
			global $config;
			if(@isset($_POST[$this->getOptionRequest])){
				$this->requestedOption = functions::filterString($_POST[$this->getOptionRequest]);
					if(in_array($this->requestedOption, UserOptions::$availableForCurrentUser["optionNames"])) {
						$this->buildPage(UserOptions::$availableForCurrentUser[$this->requestedOption]);
						die($this->pageTemplate);
					} else {
					die('{"message": "No acces for option - '.$this->requestedOption.'"}');
					}
			}
		}
		
		private function buildPage($requestedOption){
			$this->setTpl();
			foreach($requestedOption as $key => $value){
				$toReplace = "{".$key."}";
				if(strpos($this->pageTemplate,$toReplace)) {
					$this->pageTemplate = str_replace($toReplace, $value, $this->pageTemplate);
				}
			}
		}
		
		private function setTpl() {
			$this->pageTemplate = file::efile(__DIR__.$this->pageTplFile)["content"];
		}
	}