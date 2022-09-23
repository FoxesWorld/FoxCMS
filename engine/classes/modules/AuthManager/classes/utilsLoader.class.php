<?php
define('userUtils', true);

	class utilsLoader extends AuthManager {
		
		private $includePath = '/userUtilities/';
		
		function __construct(){
			foreach(filesInDir::filesInDirArray(dirname(__FILE__).$this->includePath) as $key){
				if(file_exists(dirname(__FILE__).$this->includePath.$key)) {
					require(dirname(__FILE__).$this->includePath.$key);
				}
			}
		}
		
	}