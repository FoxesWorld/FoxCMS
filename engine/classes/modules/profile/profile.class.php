<?php
	
	$profile = new profile();


		class profile extends init {
			
			function __construct(){
				if(@$_SESSION['isLogged']) {
					initFunctions::libFilesInclude(dirname(__FILE__).'/classes', false);
					$shortProfile = new shortProfile();
					init::$profileBlock = $shortProfile->profileOut();
					
					foreach($this->modalsLogged as $key => $value){
						$thisField = new modalConstructor($key, $value[0], $value[1], $value[2]);
						$thisField->mdlOut();
					}
				}
			}
			
		}