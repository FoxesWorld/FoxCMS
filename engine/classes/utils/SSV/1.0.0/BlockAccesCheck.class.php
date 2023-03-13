<?php

	class BlockAccessCheck extends SSV {
		
		private $content;
		private $userDisplay;
		
		function __construct($content, $userDisplay) {
			$this->content = $content;
			$this->userDisplay = $userDisplay;
		}
		
		protected function checkBlocks() {
			if(strpos($this->content, "[hasPriviligies]")){
				if(init::$usrArray['login'] !== $this->userDisplay && init::$usrArray['groupTag'] !== "admin") {
					$this->content = preg_replace("'\\[hasPriviligies\\](.*?)\\[/hasPriviligies\\]'si", '', $this->content);
				} else {
					$this->removeTags($this->content, "hasPriviligies");
				}
			}
			
			if(strpos($this->content, "[userOnly]")){
				if(init::$usrArray['user_group'] == 1){
					$this->content = preg_replace("'\\[userOnly\\](.*?)\\[/userOnly\\]'si", '', $this->content);
				}
			}
			
			return $this->content;
		}
		
		private function removeTags($content, $tag) {
			$this->content = str_replace("[".$tag."]", ' ', $this->content);
			$this->content = str_replace("[/".$tag."]", ' ', $this->content);
		}
		
	}