<?php

	class UserFieldsReplacement extends SSV {
		
		private $content;
		
		function __construct($content){
			$this->content = $content;
		}
		
		protected function replaceUserTags($userData){
			global $config, $lang;
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
								$value = $timeTwist[0]." ".$lang['userProfile']['ago'];
								//$value = functions::unixToHumanReadable($userData[$key]);
							} else {
								$value = '<i class="fa fa-circle FoxesStatus_online" _title="'.$userData['login'].'$nbsp;'.$lang['userProfile']['offline'].'"></i> '.$lang['userProfile']['offline'];
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