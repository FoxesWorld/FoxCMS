<?php

	$RequestHandler = new RequestHandler;

	class RequestHandler extends init {
		
		function __construct() {
			if(count($_POST) > 0) {
				$thisRequest = $_POST;
					@$keyCheck = $this->checkSecureKey($thisRequest["key"]);
					if($keyCheck === true){
						foreach($thisRequest as $key => $value){
							if($value) {
								init::$REQUEST[$key]  = functions::filterString($value);
							} else {
								init::$REQUEST[$key]  = functions::filterString("undefined");
							}
						}
					} else {
						die('{"message": "'.@$thisRequest["key"].' - Is a wrong secure key!"}');
					}
			}
		}
		
		private function checkSecureKey($key) {
			global $config;
			if($config["keyCheck"]) {
				if(count($thisRequest["key"]) <= 0) {
					switch($key) {
						case "":
						case null:
						case false:
							return false;
						break;

						default:
						if($key === $config['javascript']["secureKey"]){
								return true;
							} else {
								return false;
							}
						break;
					}
				} else {
					die('{"message": "No secure key!"}');
				}
			} else {
				return true;
			}
		}
		
	}