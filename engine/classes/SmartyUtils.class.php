<?php 

	class smartyUtils extends smartyInit {
		
		protected static $outString = '';
		
		function __construct() {
			
		}
		
		function pluginsInclude(){
			$pluginsDir = ENGINE_DIR.'plugins/';
			$scanDir = filesInDir::filesInDirArray($pluginsDir);
			self::$outString .= $this->requireJS("jquery.min.js", $pluginsDir);
			foreach($scanDir as $object) {
				$currentObjectDir = $pluginsDir.$object;
				if(is_dir($currentObjectDir)){
					$pluginDirScan = filesInDir::filesInDirArray($currentObjectDir);
					foreach($pluginDirScan as $pluginDirContents){
						$this->scanPluginDir($pluginDirContents, $currentObjectDir);
					}	
				}
			}
		}
		
		private function scanPluginDir($assetsDir, $currentObjectDir, $debug = false) {
			switch($assetsDir){
				case "css":
					$currentCSSDir = $currentObjectDir.'/css/';
					if($debug)echo "Scanning ".$currentCSSDir."<br />";
					$cssScan = filesInDir::filesInDirArray($currentCSSDir, 'css');
					
						foreach($cssScan as $cssFile){
							$exclude = $this->checkExclude($cssFile, $currentCSSDir);
							if($exclude === false) {
								if($debug)echo "		- File adding ".$cssFile."<br />";
								self::$outString .= $this->requireCSS($cssFile, $currentCSSDir);
							} else {
								if($debug)echo "Excluding ".$cssFile."<br />";
							}
						}

				break;
						
				case "js":
					$currentJSDir = $currentObjectDir.'/js/';
					if($debug)echo "Scanning ".$currentJSDir."<br />";
					
					$jsScan = filesInDir::filesInDirArray($currentJSDir, 'js');
					foreach($jsScan as $jsFile){
						$exclude = $this->checkExclude($jsFile, $currentJSDir);
						if($exclude === false) {
							if($debug)echo "		- File adding ".$jsFile."<br />";
							self::$outString .= $this->requireJS($jsFile, $currentJSDir);
						} else {
							if($debug)echo "Excluding ".$jsFile."<br />";
						}
					}

				break;
			}
		}
		
		private function checkExclude($FILE, $DIR) {
			$excludeFile = $DIR.'exclude';
			$excludeStatus = false;
			if(file_exists($excludeFile)) {
					$excludeMasks = json_decode(file::efile($excludeFile)["content"])->excludeFiles;
					foreach($excludeMasks as $mask){

						if(strpos($FILE, $mask)) {
							$excludeStatus = true;
							break;
						}
						if($mask === "*") {
							$excludeStatus = true;
						}
				}
			}
			return $excludeStatus;
		}
		
		private function requireCSS($file, $path) {
			$path = str_replace(ROOT_DIR, '', $path);
			$CSSline = '<link rel="stylesheet" type="text/css" href="'.$path.$file.'">'."\n";
			return $CSSline;
		}
			
		private function requireJS($file, $path){
			$path = str_replace(ROOT_DIR, '', $path);
			$JSline = '<script src="'.$path.$file.'"></script>'."\n";
			return $JSline;
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
				$builtInJS .= 'let '.$key.' = "'.$value.'";'."\n";
			}

			$builtInJS .= 'formInit(500); '."\n".'request = new request("/", {key:"'.$config['secureKey'].'", user:"'.init::$usrArray['login'].'"}, true);
			</script>';
			return $builtInJS;
		}
	}