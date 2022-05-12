<?php

	$fileManager = new fileManager();

	class fileManager extends init {

		protected static $bindDir;
		protected static $usrDir;
		
		function __construct(){
			global $config;
			if(isset($_REQUEST['fAction'])){
				$fAction = $_REQUEST['fAction'];
				if(init::$isLogged) {
					self::$usrDir = ROOT_DIR.'/uploads/'.init::$usrArray['login'].'/';
					if(@$_REQUEST['key'] === $config['secureKey']) {
						switch($fAction){
							case 'scanDir':
								require ('operations/fileScanner.class.php');
								$dirScan = $_REQUEST['dirScan'] ?? "";
								self::$bindDir = self::$usrDir.$dirScan;
								fileScanner::lookUpDir(self::$bindDir, true);
							break;
							
							case 'del':
								require ('operations/fileDel.class.php');
								$fPath = self::checkUserDir($_POST['fPath']);
								$fName = $_POST['fName'];
								fileDel::delFile(ROOT_DIR.$fPath.$fName);
							break;
						}
					} else {
						exit('{"message": "Wrong key!"}');
					}							
				} else {
					exit('{"message": "Not logged in!"}');
				}
			}
		}
		
		protected static function FileSizeConvert($bytes) {
			$result = '';
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

			foreach($arBytes as $arItem) {
				if($bytes >= $arItem["VALUE"])
				{
					$result = $bytes / $arItem["VALUE"];
					$result = str_replace(".", "," , strval(round($result, 2)))." ".$arItem["UNIT"];
					break;
				}
			}
			return $result;
		}
		
		private static function checkUserDir($dir){
			if(strpos($dir, '../')){
				exit('{"message": "Not in user directory!"}');
			} else {
				return $dir;
			}
		}
	}