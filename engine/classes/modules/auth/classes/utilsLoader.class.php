<?php
define('userUtils', true);

	class utilsLoader {
		
		private $includePath = '/userUtilities/';
		
		function __construct(){
			foreach(filesInDir::filesInDirArray(dirname(__FILE__).$this->includePath) as $key){
				if(file_exists(dirname(__FILE__).$this->includePath.$key)) {
					require(dirname(__FILE__).$this->includePath.$key);
				}
			}
			//require ('userUtilities/groupAssociacion.class.php');
			//require ('userUtilities/loadUserInfo.class.php');
			//require ('userUtilities/sessionManager.class.php');
		}
		
	}