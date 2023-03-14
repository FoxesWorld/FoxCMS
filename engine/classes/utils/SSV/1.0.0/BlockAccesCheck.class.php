<?php

	class BlockAccessCheck extends SSV {
		
		private $content;
		private $userDisplay;
		private $blockSettings = array("hasPriviligies" => array("groupTag" => "admin", "login" => "->userDisplay"));
		
		function __construct($content, $userDisplay) {
			$this->content = $content;
			$this->userDisplay = $userDisplay;
		}
		
		protected function checkBlocks() {
			/*
			foreach($this->blockSettings as $blockName => $conditions){
				$blockTag = "[".$blockName."]";
				if(strpos($this->content, $blockTag)){
					foreach($conditions as $userArrField => $required){
						if(strpos($required, "->")) {
							$required = explode("", $required)[1];
							if(){
								
							}
						}
					}
				}
			} */
			if(strpos($this->content, "[hasPriviligies]")){
				if(init::$usrArray['login'] !== $this->userDisplay && init::$usrArray['groupTag'] !== "admin") {
					$this->content = preg_replace("'\\[hasPriviligies\\](.*?)\\[/hasPriviligies\\]'si", '', $this->content);
				} else {
					$this->removeTags($this->content, "hasPriviligies");
				}
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