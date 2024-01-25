<?php

	class BlockAccessCheck extends SSV {
		
		private $content;
		private $requestedUserArray;
		
		function __construct($content, $requestedUserArray) {
			$this->content = $content;
			$this->requestedUserArray = $requestedUserArray;
		}
		
		protected function checkBlocks() {
			
			if(stripos($this->content, "[hasPriviligies]")) {
				if(init::$usrArray['isLogged']){
					if(init::$usrArray['login'] === $this->requestedUserArray['login'] || init::$usrArray['groupTag'] === "admin") {
						$this->removeTags($this->content, "hasPriviligies");
					}
				}
				$this->content = preg_replace("'\\[hasPriviligies\\](.*?)\\[/hasPriviligies\\]'si", '', $this->content);
			}
			
			if (stripos($this->content, "[group=") !== false OR stripos($this->content, "[not-group=") !== false) {
				$this->content = $this->check_group($this->content);
				
			}
			
			if (stripos($this->content, "[not-login=") !== false) {
				$this->content = preg_replace_callback ( '#\\[not-login=(.+?)\\](.*?)\\[/not-login\\]#is',
					function ($matches) {
						$groups = $matches[1];
						$block = $matches[2];
						$groups = explode( ',', $groups );
						if(in_array(init::$usrArray['login'], $groups)) return "";
						return $block;
					},		
				$this->content);
			}
			return $this->content;
		}
		
		private function removeTags($content, $tag) {
			$this->content = str_replace("[".$tag."]", ' ', $this->content);
			$this->content = str_replace("[/".$tag."]", ' ', $this->content);
		}
		
		private function check_group( $matches ) {
			$regex = '/\[(group|not-group)=(.*?)\]((?>(?R)|.)*?)\[\/\1\]/is';
			if (is_array($matches)) {
				$groups = $matches[2];
				$block = $matches[3];
				if ($matches[1] == "group") $action = true; else $action = false;
				$groups = explode( ',', $groups);
				if( $action ) {
					if(!in_array(init::$usrArray['user_group'], $groups)) $matches = ''; else $matches = $block;
				} else {
					if(in_array(init::$usrArray['user_group'], $groups ) ) $matches = ''; else $matches = $block;
				}
			}
			
			return preg_replace_callback($regex, array( &$this, 'check_group'), $matches);
		}
		
	}