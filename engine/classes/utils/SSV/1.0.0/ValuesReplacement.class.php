<?php

	class ValuesReplacement {
		
		private $content;
		
		function __construct($key, $value, $content) {
			$this->processContent($key, $value, $content);
		}
		
		private function processContent($key, $value, $content){
			$this->content = $content;
				if(stripos($this->content, $key)) {
					//die(str_replace($key, $value, $this->content));
					//TO FIX FIRST ARR ELEMENT
					$this->content = preg_replace("{".$key."}", $value, $this->content);
				}
		}
		
		public function getContent(){
			return $this->content;
		}
		
	}