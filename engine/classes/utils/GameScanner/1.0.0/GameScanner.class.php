<?php

if(!defined('FOXXEY')) {
	header( "HTTP/1.1 403 Forbidden" );
	header ( 'Location: /' );
	die( "Hacking attempt!" );
}

	class GameScanner {
		
		private $clientDir;
		private $dirsToCheck;
		private $platform = 0;
		private $platformExtensions = array(
			array("so", "zip", "jar", "toml", "txt", ".cfg", "recipe", "dat", "properties", "json", "git", "sha1", "", "cache", "tsrg"),
			array("dll", "zip", "jar", "toml", "txt", "cfg", "recipe", "dat", "properties","git", "sha1", "json"), 
			array("dylib", "zip", "jar", "toml", "txt", "cfg", "recipe", "dat", "properties","git", "sha1", "json"), 
			array("so", "zip", "jar", "toml", "txt", "cfg", "recipe", "dat", "properties","git", "sha1", "json"), 
			array("so", "zip", "jar", "toml", "txt", "cfg", "recipe", "dat", "properties","git", "sha1", "json")
			);
		
		function __construct($client, $version, $platform){
			global $config;
			$this->platform = $platform;
			$this->clientDir = ROOT_DIR.UPLOADS_DIR.$config['launcherSettings']['gameFiles'];
			$this->dirsToCheck = json_decode($this->dirsToCheck($client, $version), true);
		}
		
			function dirsToCheck($client, $version, $JSON = true){
				global $config;
				$i = 0;
				$outputArray = array();
				$dirsArray = array(
				$this->clientDir.'versions/'.$version.'/assets/indexes',
				$this->clientDir.'versions/'.$version.'/assets/objects',
				$this->clientDir.'clients/'.$client,
				$this->clientDir.'versions/'.$version);

				while($i < count($dirsArray)) {
					$outputArray[] = $dirsArray[$i];
					$i++;
				}
				return json_encode($outputArray, JSON_UNESCAPED_SLASHES);				
			}
			
			public function checkfiles() {
				global $config;
				$i = 0;
				$fileNum = 0;
				$fileOBJ = array();
				$array = "";
				while($i < count($this->dirsToCheck)) {
						if(!is_dir($this->dirsToCheck[$i])) {
								die("<b>ERROR!</b> \nDirectory - ".$this->dirsToCheck[$i]." doesn't exist!");
						}
						$objects = new RecursiveIteratorIterator(new RecursiveDirectoryIterator($this->dirsToCheck[$i]), RecursiveIteratorIterator::SELF_FIRST);
							foreach($objects as $name => $object) {
								$basename = basename($name);
								$isdir = is_dir($name);
								
								if ($basename!="." and $basename!=".." and !is_dir($name)){
									$thisExtension = @pathinfo($name.$basename)['extension'];
									
									$str = str_replace(ROOT_DIR, "", str_replace($basename, "", $name));
									if($thisExtension !== null && in_array($thisExtension, $this->platformExtensions[$this->platform]) || $thisExtension == ""){
										$fileOBJ[] = 
										[
											'filename' => $str.$basename,
											'hash'     => md5_file($name),
											'size'     => strval(filesize($name))
										];
									}
								}
								$fileNum++;
							}
					$i++;
				}	
				return json_encode($fileOBJ, JSON_UNESCAPED_SLASHES);
			}
	}