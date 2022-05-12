<?php

	class fileScanner extends fileManager {
		
		protected static function lookUpDir($bindDir, $out = false) {
			if(!strpos($bindDir, '../')){
				if($out) {
					exit(self::scanUserDir($bindDir));
				}
			} else {
				exit('{"message": "Not in user directory!"}');
			}
		}

		private static function scanUserDir($path) {
			$scannedArray = array();
			$scannedFiles = filesInDir::filesInDirArray($path);
			if(is_array($scannedFiles)) {
				if(count($scannedFiles) > 0) {
				foreach($scannedFiles as $key){
					$filePath = str_replace(ROOT_DIR, "", fileManager::$bindDir);
					$isDirectory = is_dir($path.'/'.$key);
					switch($isDirectory){
						case true:
							$scannedArray[] = array(
								"name" => $key,
								"filePath" => $filePath,
								"dir" => $isDirectory
							);
						break;
						case false:
							$fileSize = fileManager::FileSizeConvert(filesize($path.'/'.$key));
							$scannedArray[] = array(
								"name" => $key, 
								"filePath" => $filePath.'/',
								"dir" => $isDirectory,
								"fileSize" => $fileSize
							);
						break;

					}
				}
			} else {
				return '{"message": "No files loaded!"}';
			}}
			return json_encode($scannedArray, JSON_UNESCAPED_SLASHES);
		}
	}