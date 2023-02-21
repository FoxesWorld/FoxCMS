<?php

	class PluginsScanner extends smartyInit {
		
		protected $outString = '';
		private $pluginsDir;
		private $excludeFileName = 'exclude';
		private $skipFile = "skip";
		private $incOptFile = "incOpt.json";
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
					if($this->checkRights($currentObjectDir)) {
						//echo '<script>console.log("%cIncluding plugin '.$object.'", "color: green");</script>';
						$pluginDirScan = filesInDir::filesInDirArray($currentObjectDir);
						foreach($pluginDirScan as $pluginDirContents){
							$this->directoryScanner($pluginDirContents, $currentObjectDir);
						}
						self::$pluginsArray["pluginName"][] = $object;
					} else {
						//echo '<script>console.log("%cExcluding '.$object.'", "color: red");</script>';
					}
				}
			}
		}
		
		private function directoryScanner($type, $currentObjectDir, $debug = false) {
			$currentScanDir = $currentObjectDir.'/'.$type.'/';
				if($debug)echo "Scanning ".$currentScanDir."<br />";
				$dirScan = filesInDir::filesInDirArray($currentScanDir, $type);
				if(is_array($dirScan)) {
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
		
		private function checkRights($DIR) {
			$pluginOptFile = $DIR.'/'.$this->incOptFile;
			if(file_exists($pluginOptFile)){
				$pluginOptions = json_decode(file::efile($pluginOptFile)["content"], true);
				foreach($pluginOptions as $key => $value){
					switch($key){
						case "pluginGroup":
							return $this->checkUserAccess(init::$usrArray['user_group'], $value);				
						break;
					}
				}
			} else {
				return true;
			}
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
		
		/* REPEATING CODE as In UserOptions!!!*/
		private function checkUserAccess($usergroup, $optionAccessGroup){
			switch(is_array($optionAccessGroup)){
				case true:
					if(in_array($usergroup, $optionAccessGroup)) {
						return true;
					}
					break;
						
					case false:
						if($usergroup == $optionAccessGroup){
							return true;
						}
					break;
			}
			return false;
		}
	}