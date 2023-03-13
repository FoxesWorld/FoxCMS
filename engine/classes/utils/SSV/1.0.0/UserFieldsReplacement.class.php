<?php

	class FieldsReplacement extends SSV {
		
		private $content;
		
		function __construct($content){
			$this->content = $content;
		}
		
		protected function replaceUserTags($userData){
			global $config;
			$value = "";
			foreach($config['userDatainDb'] as $key){
				$searchField = '['.$key.']';
				if(strpos($this->content, $searchField)) {
					switch($searchField){
						case "[profilePhoto]":
							if($userData[$key] !== null) {
								$value = UPLOADS_DIR.USR_SUBFOLDER.$userData['login'].DIRECTORY_SEPARATOR.$userData[$key];
							} else {
								$value = str_replace(ROOT_DIR, '', TEMPLATE_DIR).'assets/img/no-photo.jpg';
							}
						break;
						
						case "[reg_date]":
							$value = functions::showDateAgo($userData[$key])[0];
						break;
						
						case "[last_date]":
							$timeTwist = functions::showDateAgo($userData[$key]);
							if($timeTwist[1] >= 360) {
								$value = $timeTwist[0]." ago";
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