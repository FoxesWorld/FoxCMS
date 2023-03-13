<?php

	class inDirScanner {
		
		private $scanDir;
		private $rootDir;
		private $subDir;
		
		function __construct($rootDir, $subDir) {
			$this->rootDir = $rootDir;
			$this->subDir = $subDir;
			$this->scanDir = $rootDir.$subDir;
		}
		
		public function getDirContents() {
			$dirArray = array();
			$fileNum = 0;
			$invalidArray = array('..', '..');
			if(!in_array(basename($this->scanDir), $invalidArray)) {
				if(is_dir($this->scanDir)) {
					$dirArray = filesInDir::filesInDirArray($this->scanDir);
					foreach($dirArray as $file){
						$fileNum++;
					}	
				}
				die('{"fileNum": '.$fileNum.'}');
			} else {
				die('{"message": "Invalid directory!"}');
			}
		}
	}