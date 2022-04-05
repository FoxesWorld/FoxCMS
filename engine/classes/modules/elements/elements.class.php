<?php

	$elements = new elements();

	class elements extends init {
		
		function __construct(){
			initFunctions::libFilesInclude(dirname(__FILE__).'/plugins', false);
		}
		
	}