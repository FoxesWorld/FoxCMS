<?php
if(!defined('profile')) {
	die ('{"message": "Not in profile thread"}');
}
	class userInfo {

		private $data;
		
		function __construct($data) {
			$this->data = functions::filterString($data);
			if(init::$isLogged) {
				if(init::$usrArray[$this->data]){
					functions::jsonAnswer(init::$usrArray[$this->data], false);
				} else {
					functions::jsonAnswer('No userfield - '.$this->data, true);
				}
			} else {
				functions::jsonAnswer('User not logged!', true);
			}
		}
		
	}