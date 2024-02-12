<?php

	class GetJre {
		
		private $jre;
		private $jreOutput;
		
		function __construct($version) {
			global $config;
			$this->jre = ROOT_DIR.UPLOADS_DIR.$config['launcherSettings']['jreDir'].$version;
			$this->jreOutput = array(
				'filename' => str_replace(ROOT_DIR, "", $this->jre).".zip",
				'hash'     => md5_file($this->jre.".zip"),
				'size'     => strval(filesize($this->jre.".zip"))
		);
		}
		
		public function getRuntime(){
			die(json_encode($this->jreOutput, JSON_UNESCAPED_SLASHES));
		}
		
	}