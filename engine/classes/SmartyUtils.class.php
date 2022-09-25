<?php 

	class smartyUtils extends smartyInit {
		
		protected static $outString = '';
		
		function __construct() {
			
		}
		
		function pluginsInclude($IncludeArray){
			foreach($IncludeArray as $key => $value){
				if($value[3] == true){
					self::$outString .= "<!-- ".$key." -->";
					$thisFiles = filesInDir::filesInDirArray($value[1], $value[0]);
					$thisPath = str_replace(ROOT_DIR, '', $value[1]);
					foreach($thisFiles as $oneFile){
						if(strpos($oneFile, '.css')){
							if(!@strpos($oneFile, $value[2])) {
								if(file_exists($value[1].$oneFile)) {
									self::$outString .= '	<link rel="stylesheet" type="text/css" href="'.$thisPath.$oneFile.'">'."\n";
								}
							}
						} elseif(strpos($oneFile, '.js')){
							if(!@strpos($oneFile, $value[2])) {
								if(file_exists($value[1].$oneFile)) {
									self::$outString .= '	<script src="'.$thisPath.$oneFile.'"></script>'."\n";
								}
							}
						}
					}
				}
			}
		}
		
		function assignUserFields($smarty) {
			global $config;
			foreach($config['userDatainDb'] as $key){
				$smarty->assign($key, init::$usrArray[$key]);
			}
			$smarty->assign('group_name', init::$usrArray['group_name']);
		}
		
		function assignJs(){
			global $config;
			$builtInJS = '<script>';
			
			foreach(init::$usrArray as $key => $value){
				$builtInJS .= 'let '.$key.' = "'.$value.'";'."\n";
			}

			$builtInJS .= 'formInit(500); '."\n".'request = new request("/", {key:"'.$config['secureKey'].'", user:"'.init::$usrArray['login'].'"}, true);
			</script>';
			return $builtInJS;
		}
	}