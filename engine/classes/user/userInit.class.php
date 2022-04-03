<?php

	class userInit extends init {
		
		
		
		function __construct() {
				switch(@$_SESSION['isLogged']){
					case true:
						initFunctions::libFilesInclude(ENGINE_DIR.'/classes/user/profile', false);
						$profile = new profile();
						init::$profileBlock = $profile->profileOut();
					break;
					
					default:
						foreach($this->modalsUnlogged as $key => $value){
							$thisField = new modalConstructor($key, $value[0], $value[1], $value[2]);
							$thisField->mdlOut();
						}
					break;
					
				}
		}
		
	}