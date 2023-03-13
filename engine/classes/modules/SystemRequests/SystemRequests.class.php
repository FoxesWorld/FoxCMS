<?php

		$SystemRequests = new SystemRequests();
		$SystemRequests->requestListener();
		class SystemRequests extends init {
		
			private $requestHeader = "sysRequest";
			
			function __construct() {
				init::classUtil('inDirScanner', "1.0.0");
				
			}
			
			public function requestListener(){
				if(isset(init::$REQUEST[$this->requestHeader])){
					switch(init::$REQUEST[$this->requestHeader]) {
						case "tplScan":
							$inDirScanner = new inDirScanner(TEMPLATE_DIR, @init::$REQUEST['path']);
							$inDirScanner->getDirContents();
						break;
						
						case "startUpSound":
							$startUpSound = new startUpSound;
							$startUpSound->generateAudio();
						break;
						
						default:
							die('{"message": "Unknown sysRequest option!"}');
						break;
					}
				}
			} 	
		}