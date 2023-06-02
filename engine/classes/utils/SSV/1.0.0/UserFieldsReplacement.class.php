<?php

	class UserFieldsReplacement extends SSV {
		
		private $content;
		
		function __construct($content){
			$this->content = $content;
		}
		
		protected function replaceUserTags($userData){
			global $config;
			$value = "";
			foreach($config['userFieldsArray'] as $key){
				$searchField = '['.$key.']';
				if(strpos($this->content, $searchField)) {
					switch($searchField){
						
						case "[reg_date]":
							$value = functions::showDateAgo($userData[$key])[0];
						break;
						
						case "[last_date]":
							$timeTwist = functions::showDateAgo($userData[$key]);
							if($timeTwist[1] >= 360) {
								$value = $timeTwist[0]." назад";
							} else {
								$value = "Online";
							}
						break;
						
						default:
							$value = $userData[$key];
						break;
					}
					$this->content = str_replace($searchField, $value, $this->content);
				}
			}
			return $this->content;
		}
		
	}