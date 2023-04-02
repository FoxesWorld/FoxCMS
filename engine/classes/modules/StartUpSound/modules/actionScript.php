<?php

	class actionsSUPS extends startUpSound {
		
		function __construct(){
			$this->listActions($_POST);
		}

		private function listActions($request){
			global $config;
			//$Arg = explode('&', $request)[1];
			foreach ($request as $key => $value) {
				
				$requestTitle = trim(strip_tags(stripslashes($key)));
				$requestValue = trim(strip_tags(stripslashes($value)));
				//echo $requestTitle;
				switch ($requestTitle) {
					case 'MOOD':
						startUpSound::$moodToPlay = $requestValue;
					break;
					
					case 'CHAR':
						//die($requestValue);
						startUpSound::$characterToPlay  = $requestValue;
					break;
				}
			}
		}
		
	}