<?php

	class GameScanner {
		
		private $clientDir;
		private $dirsToCheck;
		
		function __construct($client, $version){
			global $config;
			$this->clientDir = ROOT_DIR.UPLOADS_DIR.$config['siteSettings']['gameFiles'];
			$this->dirsToCheck = json_decode($this->dirsToCheck($client, $version), true);
		}
		
			function dirsToCheck($client, $version, $JSON = true){
				global $config;
				$i = 0;
				$outputArray = array();
				$dirsArray = array(
				$this->clientDir.'assets/indexes',
				$this->clientDir.'assets/objects',
				$this->clientDir.'versions/'.$version);
				$fullArray = array_merge($dirsArray, $this->dirsToCheckFullClient($client)); 

					while($i < count($fullArray)) {
						$outputArray[] = $fullArray[$i];
						$i++;
					}
				if($JSON === true){
					return json_encode($outputArray, JSON_UNESCAPED_SLASHES);
				} else {
					return implode('<:b:>', $outputArray);
				}
			}
			
			function dirsToCheckFullClient($client){
				global $config;
				$dirsWeHave = array();
				$path = $this->clientDir."clients/".$client;
				if(!is_dir($path)) {
					return $path." is not a directory!";
				}
				$objects = new RecursiveIteratorIterator(new RecursiveDirectoryIterator($path), RecursiveIteratorIterator::SELF_FIRST);
								
							foreach($objects as $name => $object) {
								$basename = basename($name);
								if ($basename != "." and $basename != ".." && is_dir($name)){
									//$name = str_replace('files/clients/', "", $name);
										$dirsWeHave[] = $name; 
								}
							}
				return $dirsWeHave;
			}
			
			public function checkfiles($JSON = true) {
				global $config;
				$i = 0;
				$fileNum = 0;
				$fileOBJ = array();
				$massive = "";
				while($i < count($this->dirsToCheck)) {
					//var_dump(is_dir($this->dirsToCheck[$i]));
						if(!is_dir($this->dirsToCheck[$i])) {
								die("<b>ERROR!</b> \nDirectory - ".$this->dirsToCheck[$i]." doesn't exist!");
						}
						$objects = new RecursiveIteratorIterator(new RecursiveDirectoryIterator($this->dirsToCheck[$i]), RecursiveIteratorIterator::SELF_FIRST);
						
							foreach($objects as $name => $object) {
								$basename = basename($name);
								$isdir = is_dir($name);
								if ($basename!="." and $basename!=".." and !is_dir($name)){
									$str = str_replace(ROOT_DIR, "", str_replace($basename, "", $name));
									if($JSON === true) {
										$fileOBJ[] = 
										[
											'filename' => $str.$basename,
											'hash'     => md5_file($name),
											'size'     => strval(filesize($name))
										];
									} else {
										$massive = $massive.$str.$basename.':>'.md5_file($name).':>'.filesize($name)."<:>";
									}
								}
								$fileNum++;
							}
					$i++;
				}	
				if($JSON === true) {
					return json_encode($fileOBJ, JSON_UNESCAPED_SLASHES);
				} else {
					return $massive;
				}
			}
	}