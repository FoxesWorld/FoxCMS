<?php
if (!defined('FOXXEY')) {
	die ('{"message": "Not in FOXXEY thread"}');
}
	class userInit extends init {
		
		protected $db;
		protected $logger;

		function __construct($db, $logger) {
			global $config;
				switch(@$_SESSION['isLogged']){
					case true:
						$this->db = $db;
						$this->logger = $logger;
						initFunctions::libFilesInclude(dirname(__FILE__).'/profile', false);
						$profile = new profile();
						init::$profileBlock = $profile->profileOut();

						foreach($this->modalsLogged as $key => $value){
							$thisField = new modalConstructor($key, $value[0], $value[1], $value[2]);
							$thisField->mdlOut();
						}
					break;
					
					default:
						require (dirname(__FILE__).'/authWrapper.class.php');

						foreach($this->modalsUnlogged as $key => $value){
							$thisField = new modalConstructor($key, $value[0], $value[1], $value[2]);
							$thisField->mdlOut();
						}
					break;
					
				}
		}
		
	}