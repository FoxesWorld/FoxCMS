<?php 

	class smartyUtils extends smartyInit {
		
		function __construct() {
			
		}
		
		protected function assignUserFields($smarty) {
			global $config;
			$fieldsArray = explode(",", $config['other']['userFieldsArray']);
			foreach($fieldsArray as $key){
				@$smarty->assign($key, init::$usrArray[$key]);
			}
		}
		
		protected function assignJs(){
			global $jsCfg;
			$builtInJS = '<script>';
				$replaceArray = array_merge($jsCfg['javascript'], init::$usrArray);
				foreach($replaceArray as $key => $value){
					$replaceFields[] = '"'.$key.'"';
					$thisArr = array();
					if(!is_array($value)) {
						$jsData[] = '"'.$key.'": "'.$value.'"';
					} else {
						foreach($value as $colorGroup => $groupColors){
							if($colorGroup === init::$usrArray['groupTag']) {
								foreach($groupColors as $color){
									$thisArr[] = '"'.$color.'"';
								}
							}
						}
						$jsData[] = '"'.$key.'"'.':['.implode(",", $thisArr).']';
					}
				}
				$builtInJS .= 'const replaceData = {'.implode(",", $jsData).'};'."\n";
				$builtInJS .= 'const userFields = ['.implode(",", $replaceFields).'];'."\n";
				$builtInJS .= 'request = new request("/", {key:"'.$jsCfg['javascript']['secureKey'].'", user:"'.init::$usrArray['login'].'"}, true);';
			$builtInJS .= '</script>';
			return $builtInJS;
		}
	}