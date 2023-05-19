<?php

	class inDirScanner {
		
		private $scanDir;
		private $rootDir;
		private $subDir;
		private $mask;
		public array $filesArray = array();
		private int $filesNum = 0;
		
		function __construct($rootDir, $subDir, $mask) {
			$this->rootDir = $rootDir;
			$this->subDir = $subDir;
			$this->mask = $mask;
			$this->scanDir = $rootDir.$subDir;
			$this->scanThisDir();
		}
		
		private function scanThisDir() {
			$dirArray = array();
			$invalidArray = array('..', '.');
			if(!in_array(basename($this->scanDir), $invalidArray)) {
				if(is_dir($this->scanDir)) {
					$dirArray = filesInDir::filesInDirArray($this->scanDir, $this->mask);
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
			$filesArr = array();
			foreach($this->filesArray as $val){
				$filesArr[] = '"'.$val.'"';
			}
			return '{"files": ['.implode(',', $filesArr).'],"fileNum": '.$this->filesNum.',"filesHomeDir": "/uploads/'.$this->subDir.'/"}';
		}
	}