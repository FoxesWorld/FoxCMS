<?php 

	class smartyUtils extends smartyInit {
		
		function __construct() {
			
		}
		
		protected function assignUserFields($smarty) {
			global $config;
			foreach($config['userDatainDb'] as $key){
				@$smarty->assign($key, init::$usrArray[$key]);
			}
			$smarty->assign('groupName', init::$usrArray['groupName']);
		}
		
		protected function assignJs(){
			global $config;
			$builtInJS = '<script>';

			
			$replaceArray = array_merge($config['javascript'], init::$usrArray);
			//Parse using JS to increase stability!11!111
			foreach($replaceArray as $key => $value){
				$replaceFields[] = '"'.$key.'"';
				if(!is_array($value)) {
					$jsData[] = '"'.$key.'": "'.$value.'"';
				} else {
					foreach($value as $arrVal){
						$thisArr[] = '"'.$arrVal.'"';
					}
					$jsData[] = '"'.$key.'"'.':['.implode(",", $thisArr).']';
				}
			}
			$builtInJS .= 'const replaceData = {'.implode(",", $jsData).'};'."\n";
			
			foreach($config['javascript'] as $key => $value) {
				if(!is_array($value)) {
					$builtInJS .= 'const '.$key.' = "'.$value.'";'."\n";
				}
				
			}
			
			$builtInJS .= 'const userFields = ['.implode(",", $replaceFields).'];'."\n";
			$builtInJS .= 'formInit(500); '."\n".'request = new request("/", {key:"'.$config['javascript']['secureKey'].'", user:"'.init::$usrArray['login'].'"}, true);</script>';
			return $builtInJS;
		}
	}