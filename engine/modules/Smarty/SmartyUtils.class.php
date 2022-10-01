<?php 

	class smartyUtils extends smartyInit {
		
		function __construct() {
			
		}
		
		protected function assignUserFields($smarty) {
			global $config;
			foreach($config['userDatainDb'] as $key){
				$smarty->assign($key, init::$usrArray[$key]);
			}
			$smarty->assign('group_name', init::$usrArray['group_name']);
		}
		
		protected function assignJs(){
			global $config;
			$builtInJS = '<script>';
			
			foreach(init::$usrArray as $key => $value){
				$builtInJS .= 'const '.$key.' = "'.$value.'";'."\n";
			}
			
			foreach($config['javascript'] as $key => $value) {
				$builtInJS .= 'const '.$key.' = "'.$value.'";'."\n";
			}

			$builtInJS .= 'formInit(500); '."\n".'request = new request("/", {key:"'.$config['javascript']['secureKey'].'", user:"'.init::$usrArray['login'].'"}, true);
			</script>';
			return $builtInJS;
		}
	}