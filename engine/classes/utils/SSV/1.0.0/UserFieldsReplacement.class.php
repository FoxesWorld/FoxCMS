<?php

	class UserFieldsReplacement extends SSV {
		
		private $content;
		
		function __construct($content){
			$this->content = $content;
		}
		
		protected function replaceUserTags($userData){
			global $config;
			$value = "";
			$fieldsArray = explode(",", $config['other']['userFieldsArray']);
			foreach($fieldsArray as $key){
				$searchField = '['.$key.']';
				if(strpos($this->content, $searchField)) {
					switch($searchField){
						
						case "[reg_date]":
							$value = functions::unixToHumanReadable($userData[$key]);
						break;
						
						case "[last_date]":
							$timeTwist = functions::showDateAgo($userData[$key]);
							if($timeTwist[1] >= 360) {
								//$value = '<i class="fa fa-circle FoxesStatus_offline" _title="'.$userData['login'].' не в сети"></i>'.$timeTwist[0]." назад";
								$value = functions::unixToHumanReadable($userData[$key]);
							} else {
								$value = '<i class="fa fa-circle FoxesStatus_online" _title="'.$userData['login'].' сейчас в сети"></i> Сейчас в сети';
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