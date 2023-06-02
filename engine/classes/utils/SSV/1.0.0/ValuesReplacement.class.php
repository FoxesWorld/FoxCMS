<?php

	class ValuesReplacement {
		
		private $content;
		
		function __construct($replaceArray, $content) {
			$this->processContent($replaceArray, $content);
		}
		
		private function processContent($replaceArray, $content){
			$this->content = $content;
			foreach($replaceArray as $key => $value){
				if(stripos($this->content, $key)) {
					$this->content = preg_replace("{".$key."}", $value, $this->content);
				}
			}
		}
		
		public function getContent(){
			return $this->content;
		}
		
	}