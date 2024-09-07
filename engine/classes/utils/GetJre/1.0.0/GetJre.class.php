<?php

	class GetJre implements JsonSerializable {

		private $jreOutput;
		
		function __construct($version) {
			global $config;
			$jre = ROOT_DIR.UPLOADS_DIR.$config['launcherSettings']['jreDir'].$version;
			if(file_exists($jre.'.zip')) {
				$this->jreOutput = array(
					'filename' => str_replace(ROOT_DIR, "", $jre).".zip",
					'hash'     => md5_file($jre.".zip"),
					'size'     => intval(filesize($jre.".zip"))
				);
			} else {
				$this->jreOutput = array(
					'message' => "File not found"
				);
			}
		}
		
		public function jsonSerialize() {
			return $this->jreOutput;
		}		
	}