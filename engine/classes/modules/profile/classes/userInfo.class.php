<?php

	class userInfo {

		private $data;
		
		function __construct($data){
			$this->data = functions::filterString($data);
			if($_SESSION['isLogged'] === true) {
				if(@$_SESSION[$this->data] !== null){
					functions::jsonAnswer($_SESSION[$this->data], false);
				} else {
					functions::jsonAnswer('No userfield - '.$this->data, true);
				}
			} else {
				functions::jsonAnswer('User not logged!', true);
			}
		}
		
	}