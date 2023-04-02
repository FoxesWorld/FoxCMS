<?php

	class inDirScanner {
		
		private $scanDir;
		private $rootDir;
		private $subDir;
		public array $filesArray = array();
		private int $filesNum = 0;
		
		function __construct($rootDir, $subDir) {
			$this->rootDir = $rootDir;
			$this->subDir = $subDir;
			$this->scanDir = $rootDir.$subDir;
			$this->scanThisDir();
		}
		
		private function scanThisDir() {
			$dirArray = array();
			$invalidArray = array('..', '.');
			if(!in_array(basename($this->scanDir), $invalidArray)) {
				if(is_dir($this->scanDir)) {
					$dirArray = filesInDir::filesInDirArray($this->scanDir);
					foreach($dirArray as $file){
						$this->filesNum++;
						$this->filesArray[] = $file;
					}	
				}
			} else {
				die('{"message": "Invalid directory!"}');
			}
		}
		
		public function getFiles() {
			return '{'.implode(',', $this->filesArray).'}';
		}
		
		public function getFilesNum() {
			return '{"fileNum": '.$this->filesNum.'}';
		}
	}