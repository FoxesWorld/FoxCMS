<?php

	class ValuesReplacement {
		
		private $content;
		
		function __construct($key, $value, $content) {
			$this->processContent($key, $value, $content);
		}
		
		private function processContent($key, $value, $content){
			global $config;
			$this->content = $content;
				if(stripos($this->content, $key)) {
					$existance = functions::getStrBetween($value, "cfgVal(", ")")[0];
	
					if($existance){
						$keyVal = explode("|",$existance);	
						$unit = $keyVal[0];
						$unitVal = $keyVal[1];
						$value = $config[$unit][$unitVal];
					}
					$this->content = preg_replace("{".$key."}", $value, $this->content);

				}
		}
		
		public function getContent(){
			return $this->content;
		}
		
	}