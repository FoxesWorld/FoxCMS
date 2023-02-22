<?php 

	class smartyUtils extends smartyInit {
		
		function __construct() {
			
		}
		
		protected function assignUserFields($smarty) {
			global $config;
			foreach($config['userDatainDb'] as $key){
				$smarty->assign($key, init::$usrArray[$key]);
			}
			$smarty->assign('groupName', init::$usrArray['groupName']);
		}
		
		protected function assignJs(){
			global $config;
			$builtInJS = '<script>';

			//Parse using JS to increase stability!11!111
			foreach(init::$usrArray as $key => $value){
				$jsData[] = '"'.$key.'": "'.$value.'"';
			}
			$builtInJS .= 'const userData = {'.implode(",", $jsData).'};'."\n";
			
			foreach($config['javascript'] as $key => $value) {
				$builtInJS .= 'const '.$key.' = "'.$value.'";'."\n";
			}
			
			foreach($config['userDatainDb'] as $key) {
				$js[] = '"'.$key.'"';
			}
			$builtInJS .= 'const userFields = ['.implode(",", $js).'];'."\n";
			$builtInJS .= 'formInit(500); '."\n".'request = new request("/", {key:"'.$config['javascript']['secureKey'].'", user:"'.init::$usrArray['login'].'"}, true);</script>';
			return $builtInJS;
		}
	}