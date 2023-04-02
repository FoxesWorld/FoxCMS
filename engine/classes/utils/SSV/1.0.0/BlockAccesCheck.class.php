<?php

	class BlockAccessCheck extends SSV {
		
		private $content;
		private $requestedUserArray;
		private $blockSettings = array("group-1" => 
			array("groupTag" => "admin", "needsLogin" => true, "usrArrayVal" => "login"));
		
		function __construct($content, $requestedUserArray) {
			$this->content = $content;
			$this->requestedUserArray = $requestedUserArray;
			//$this->test();
		}
		
		protected function test() {
			foreach($this->blockSettings as $blockTag => $blockOpt){
				if(strpos($this->content, $blockTag)) {
				foreach($blockOpt as $optKey => $optValue){
					switch($optKey){
						case "usrArrayVal":
					if($this->requestedUserArray[$optValue] === init::$usrArray[$optValue]) {
						die('GG');
					} else {
						die('Not GG');
					}
						break;
					}
				}
				}
			}
		}
		
		protected function checkBlocks() {
			
			if(strpos($this->content, "[hasPriviligies]")){
				if(init::$usrArray['isLogged']){
					if(init::$usrArray['login'] === $this->requestedUserArray['login'] || init::$usrArray['groupTag'] === "admin") {
						$this->removeTags($this->content, "hasPriviligies");
					}
				}
				$this->content = preg_replace("'\\[hasPriviligies\\](.*?)\\[/hasPriviligies\\]'si", '', $this->content);
			}
			
			if(strpos($this->content, "[userOnly]")){
				if(init::$usrArray['groupTag'] === "admin"){
					$this->content = preg_replace("'\\[userOnly\\](.*?)\\[/userOnly\\]'si", '', $this->content);
				} else {
					$this->removeTags($this->content, "userOnly");
				}
			}

			
			return $this->content;
		}
		
		private function removeTags($content, $tag) {
			$this->content = str_replace("[".$tag."]", ' ', $this->content);
			$this->content = str_replace("[/".$tag."]", ' ', $this->content);
		}
		
	}