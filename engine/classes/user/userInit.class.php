<?php
if (!defined('FOXXEY')) {
	die ('{"message": "Not in FOXXEY thread"}');
}
	class userInit extends init {
		
		protected $db;
		protected $logger;

		function __construct($db, $logger) {
				switch(@$_SESSION['isLogged']){
					case true:
						$this->db = $db;
						$this->logger = $logger;
						//$this->logger->WriteLine('Tesss');
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