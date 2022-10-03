<?php

	class PluginsScanner extends smartyInit {
		
		protected $outString = '';
		private $pluginsDir;
		private $excludeFileName = 'exclude';
		private $skipFile = "skip";
		protected static $pluginsArray = array();
		
		function __construct($pluginsDir) {
			$this->pluginsDir = $pluginsDir;
		}
		
		function pluginsInclude(){
			
			$this->outString .= $this->requireJS("jquery.min.js", $this->pluginsDir);
			$scanDir = filesInDir::filesInDirArray($this->pluginsDir);
			foreach($scanDir as $object) {
				$currentObjectDir = $this->pluginsDir.$object;
				if(is_dir($currentObjectDir)){
					if(!$this->checkDirSkip($currentObjectDir)) {
						$pluginDirScan = filesInDir::filesInDirArray($currentObjectDir);
						foreach($pluginDirScan as $pluginDirContents){
							$this->directoryScanner($pluginDirContents, $currentObjectDir);
						}
						self::$pluginsArray["pluginName"][] = $object;
					}
				}
			}
		}
		
		private function directoryScanner($type, $currentObjectDir, $debug = false) {
			$currentScanDir = $currentObjectDir.'/'.$type.'/';
				if($debug)echo "Scanning ".$currentScanDir."<br />";
				$dirScan = filesInDir::filesInDirArray($currentScanDir, $type);

				foreach($dirScan as $dirFile){
					$exclude = $this->checkExclude($dirFile, $currentScanDir);
					if($exclude === false) {
						if($debug)echo "		- File adding ".$dirFile."<br />";
						switch($type) {
							case "js":
								$this->outString .= $this->requireJS($dirFile, $currentScanDir);
							break;
							
							case "css":
								$this->outString .= $this->requireCSS($dirFile, $currentScanDir);
							break;
						}
						
					} else {
						if($debug)echo "Excluding ".$dirFile."<br />";
					}
				}
		}
		
		private function checkExclude($FILE, $DIR) {
			$excludeFile = $DIR.$this->excludeFileName;
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
		
		private function checkDirSkip($DIR){
			if(file_exists($DIR.'/'.$this->skipFile)) {
				return true;
			} else {
				return false;
			}
		}
	}