<?php 

	class smartyUtils extends smartyInit {
		
		protected $db;
		
		function __construct($db) {
			$this->db = $db;
		}
		
		protected function assignUserFields($smarty) {
			global $config;
			$fieldsArray = explode(",", $config['other']['userFieldsArray']);
			foreach($fieldsArray as $key){
				@$smarty->assign($key, init::$usrArray[$key]);
			}
		}
		
		protected function assignJs(){
			global $jsCfg, $config;
			$userPermissions = init::$permissions;
			$builtInJS = '<script>';
				$replaceArray = array_merge($config['frontendSettings'], init::$usrArray);
				foreach($replaceArray as $key => $value){
					$replaceFields[] = '"'.$key.'"';
					$jsData[] = '"'.$key.'": "'.$value.'"';	
				}
				for($i=0; $i<count($userPermissions); $i++){
					$jsData[] = $userPermissions[$i];
				}

				$builtInJS .= "const replaceData = {\n".implode(",\n", $jsData).'};'."\n";
				$builtInJS .= "const userFields = [".implode(",\n", $replaceFields).'];'."\n";
				$builtInJS .= 'request = new request("/", {key:"'.$config['frontendSettings']['secureKey'].'", user:"'.init::$usrArray['login'].'"}, true);';
			$builtInJS .= '</script>';
			return $builtInJS;
		}
	}