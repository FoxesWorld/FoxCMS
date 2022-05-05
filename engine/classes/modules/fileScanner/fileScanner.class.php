<?php

	$fileScanner = new fileScanner();

	class fileScanner extends init {
		
		public static $filesInUserDir;
		private $bindDir;
		
		function __construct(){
			if(isset($_REQUEST['scanDir'])) {
				if($_SESSION['isLogged']) {
					$this->bindDir = ROOT_DIR.'/uploads/'.$_SESSION['login'].'/'.$_REQUEST['scanDir'];
					if(!strpos($this->bindDir, '../')){
						exit($this->scanUserDir($this->bindDir));
					} else {
						exit('{"message": "Not in user directory!"}');
					}
				} else {
					exit('{"message": "Not logged in!"}');
				}
			}
		}
		
		private function scanUserDir($path){
			$scannedArray = array();
			$scannedFiles = filesInDir::filesInDirArray($path);
			if(is_array($scannedFiles)) {
				foreach($scannedFiles as $key){
					$filePath = str_replace(ROOT_DIR, "", $this->bindDir);
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
							$fileSize = array('fileSize' => $this->FileSizeConvert(filesize($path.'/'.$key)));
							$scannedArray[] = array(
								"name" => $key, 
								"filePath" => $filePath.'/',
								"dir" => $isDirectory,
								'fileSize' => $this->FileSizeConvert(filesize($path.'/'.$key))
							);
						break;

					}
				}
			}
			return json_encode($scannedArray, JSON_UNESCAPED_SLASHES);
		}
		
		private function FileSizeConvert($bytes) {
			$bytes = floatval($bytes);
				$arBytes = array(
					0 => array(
						"UNIT" => "TB",
						"VALUE" => pow(1024, 4)
					),
					1 => array(
						"UNIT" => "GB",
						"VALUE" => pow(1024, 3)
					),
					2 => array(
						"UNIT" => "MB",
						"VALUE" => pow(1024, 2)
					),
					3 => array(
						"UNIT" => "KB",
						"VALUE" => 1024
					),
					4 => array(
						"UNIT" => "B",
						"VALUE" => 1
					),
				);

			foreach($arBytes as $arItem)
			{
				if($bytes >= $arItem["VALUE"])
				{
					$result = $bytes / $arItem["VALUE"];
					$result = str_replace(".", "," , strval(round($result, 2)))." ".$arItem["UNIT"];
					break;
				}
			}
			return $result;
		}
	}