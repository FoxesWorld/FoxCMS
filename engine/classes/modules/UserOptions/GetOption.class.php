<?php
if(!defined('FOXXEY')) {
	die("Hacking attempt!");
}
	class GetOption extends UserOptions {
		
		private $getOptionRequest = "getOption";
		private $pageRplace = array();
		private $pageTplFile;
		private $pageTemplate;
		private $requestedOption;
		private $requestLogin;
		
		function __construct($userLogin){
			global $config;
			if(@isset(init::$REQUEST[$this->getOptionRequest])){
				$this->pageTplFile = TEMPLATE_DIR.$config['pageTplFile'];
				$this->requestedOption = functions::filterString($_POST[$this->getOptionRequest]);
					if(in_array($this->requestedOption, UserOptions::$userOptions["optionNames"])) {
						$this->buildPage(UserOptions::$userOptions[$this->requestedOption]);
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
			$this->pageTemplate = file::efile($this->pageTplFile)["content"];
		}
	}