<?php

	class PluginsScanner extends smartyInit {
		
		protected string $outString = '';
		private string $pluginsDir = "";
		private string $incOptFile = "incOption.json";
		protected static array $pluginsArray = array();
		protected static array $pluginFiles = array();
		
		function __construct($pluginsDir) {
			$this->pluginsDir = $pluginsDir;
			self::$pluginsArray = $this->getUserPluginDirectories($pluginsDir);
			self::$pluginFiles = $this->getPluginFiles(self::$pluginsArray, $pluginsDir);
			$this->includeFiles(self::$pluginFiles);
		}
		
		private function getUserPluginDirectories($scanDir): array {
			$pluginsDirContents = filesInDir::filesInDirArray($scanDir);
			foreach($pluginsDirContents as $dirName){
				if(!is_dir($this->pluginsDir.DIRECTORY_SEPARATOR.$dirName)) {
					$pathInfo = pathinfo($this->pluginsDir.DIRECTORY_SEPARATOR.$dirName);
					$path = str_replace(ROOT_DIR, '', $pathInfo["dirname"]).DIRECTORY_SEPARATOR.$dirName;
				switch($pathInfo["extension"]) {
					case "js":
						$this->outString .= $this->requireJS($path);
					break;
					
					case "css":
						$this->outString .= $this->requireCSS($path);
					break;
				}
				}
				$pluginPath = $scanDir.$dirName;
				if(is_dir($pluginPath)) {
					$optionFile = $pluginPath.DIRECTORY_SEPARATOR.$this->incOptFile;
					if(file_exists($optionFile)) {
						$groupPermissions = $this->readOptionFile($optionFile, "pluginGroup");
						if(CheckUserAccess::checkAccess(init::$usrArray['user_group'], $groupPermissions) === true){
							$pluginsArray[] = $dirName;
						}
					} else {
						$pluginsArray[] = $dirName;
					}
				}
			}
            return $pluginsArray;
		}
		
		private function getPluginFiles($pluginsArray, $pluginsDir): array {
			$pluginFiles = array();
			foreach($pluginsArray as $plDir){
				$pluginDir = $pluginsDir.$plDir;
				$optionFile = $pluginDir.DIRECTORY_SEPARATOR.$this->incOptFile;
				foreach(filesInDir::filesInDirArray($pluginDir) as 	$pluginSubDirName){
					$pluginSubDir = $pluginDir.DIRECTORY_SEPARATOR.$pluginSubDirName;
					if(is_dir($pluginSubDir)){
						foreach(filesInDir::filesInDirArray($pluginSubDir) as $pluginFile) {
							$pluginFilePath = $plDir.'/'.$pluginSubDirName.'/'.$pluginFile;
							if(!is_dir($pluginsDir.$pluginFilePath)) {
							if(file_exists($optionFile)) {
								$excludeMask = $this->readOptionFile($optionFile, "excludeFiles");
									if($excludeMask) {
									$maskSplit = explode("/", $excludeMask[0]);
										if($maskSplit[0] !== $pluginSubDirName || strpos($pluginFile, $maskSplit[1]) === false){
											$pluginFiles[] = $pluginFilePath;
										}
									} else {
										$pluginFiles[] = $pluginFilePath;
									}
								} else {
									$pluginFiles[] = $pluginFilePath;
								}
							}
						}
					}
			    }
			}
			return $pluginFiles;
		}
		
		private function includeFiles($filesArray) {
			foreach($filesArray as $file){
				$filePath = "/plugins/".$file;
				$pathInfo = pathinfo(ROOT_DIR.$filePath);
				$extension = @$pathInfo["extension"];
				switch($extension){
					case "js":
						$this->outString .= $this->requireJS($filePath);
					break;

					case "css":
						$this->outString .= $this->requireCSS($filePath);
					break;
					
					default:
					break;
				}
			}
		}
		
		private function readOptionFile($file, $option) {
			$configArray = array();
			$configArray = json_decode(file::efile($file)["content"], true);
			if(isset($configArray[$option])) {
				return $configArray[$option];
			}
		}
		
		private function requireCSS($file): string {
            return '<link rel="stylesheet" type="text/css" href="'.$file.'">'."\n";
		}
			
		private function requireJS($file): string {
            return '<script src="'.$file.'"></script>'."\n";
		}
	}